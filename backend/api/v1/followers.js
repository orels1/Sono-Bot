/**
 * Twitch follower alerts and actions
 */

import express from 'express';
let router = express.Router();
import {client} from 'backend/twitchapi';
import Follower from 'models/follower';
import credentials from 'credentials.json';
import {io} from 'backend/socket';

const headers = {
    'Client-ID': credentials.tmi.options.clientId,
};
const twBaseUrl = 'https://api.twitch.tv/kraken';

// Follower realtime checker
function getFollowers(cb) {
    client.api({
        'url': twBaseUrl + '/channels/orels1/follows',
        'headers': headers,
    }, (err, res, body) => {
        if (err) return console.error(err);
        // check if followers are already in DB
        for (let follower of body.follows) {
            Follower.findOne({
                'name': follower.user.display_name,
            }, (err, followerInDb) => {
                if (err) return console.error(err);
                // return null if already in there
                if (followerInDb) return null;
                // create new one
                return new Follower({
                    'name': follower.user.display_name,
                    'joindate': follower.created_at
                }).save((err, follower) => {
                    if (err) return console.error(err);
                    return cb(follower);
                });
            });
        }
        return null;
    });
}

setInterval(() => {
    // emit new follower alert to the client
    getFollowers((data) => {io.emit('follower', `New follower! ${data.name}`);});
}, 5000);

/**
 * @api {get} /followers/ List all followers currently in DB
 * @apiName getFollowersList
 * @apiGroup followers
 *
 * @apiUse DBError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {Array} results.list List of followers
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "list": [
 *                      {
 *                          "_id": "21fsdkg9342ijhgh9sf0234",
 *                          "name": "sonobotty",
 *                          "joindate": "ISODate('2016-11-20T21:39:21Z')"
 *                      }
 *                  ]
 *              }
 *      }
 */
router.get('/', (req, res) => {
    Follower.find({}, (err, followers) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not list followers',
                'results': {},
            });
        }
        return res.status(200).send({
            'error': false,
            'results': {
                'list': followers,
            },
        });
    });
});

export {router};
