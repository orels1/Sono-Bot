/**
 * Bot status + twitch info
 */

import express from 'express';
let router = express.Router();
import {client} from 'backend/twitchapi';
import credentials from 'credentials.json';
import {io} from 'backend/socket';

const headers = {
    'Client-ID': credentials.tmi.options.clientId,
};
const twBaseUrl = 'https://api.twitch.tv/kraken';

// Check for status function
function getTwChannelStatus(channel, cb) {
    client.api({
        'url': twBaseUrl + `/streams/${channel}`,
        'headers': headers,
    }, (err, res, body) => {
        if (err) {
            console.error(err);
            return cb(null);
        }
        return cb(body);
    });
}

setInterval(() => {
    // emit twitch stream status to the client
    getTwChannelStatus('yogscast', (status) => {
        if (status === null) {
            return io.emit('twitch status', {
                'stream': null,
            });
        }
        return io.emit('twitch status', {
            'stream': status.stream,
        });
    });
}, 1000);

/**
 * @api {get} /status/twitch/:channel Return status info
 * @apiVersion 0.0.1
 * @apiName getTwitchStreamStatus
 * @apiGroup status
 *
 * @apiParam {String} channel Twitch channel name
 *
 * @apiUse TwError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains twitch api response. For the list of fields - consult https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "_links": {
 *                      "channel": "https://api.twitch.tv/kraken/channels/orels1",
*                       "self": "https://api.twitch.tv/kraken/channels/orels1"
 *                  },
 *                  "stream": null
 *              }
 *      }
 */
router.get('/twitch/:channel', (req, res) => {
    getTwChannelStatus(req.params.channel, (status) => {
        if (status === null) {
            return res.status(500).send({
                'error': 'TwError',
                'error_details': 'Twitch api returned an error',
                'results': {},
            });
        }
        return res.status(200).send({
            'error': false,
            'results': status,
        });
    });
});

export {router};
