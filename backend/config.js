/*
 * Configuration backend, used to save tokens and other sensetive data
 */

import express from 'express';
let router = express.Router();
import Config from '../models/config';

/**
 * @apiDefine DBError
 *
 * @apiError (500) {Object} DBError
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 500 InternalServerError
 *      {
 *          "error": "DBError",
 *          "error_details": "some DBError description",
 *          "results": {}
 *      }
 */

/**
 * @api {get} /config/ Request config API root
 * @apiName getConfigRoot
 * @apiGroup config
 *
 * @apiSuccess {String} alive-status Checks if API-handler is available
 */
router.get('/', (req, res) => {
    res.status(200).send('Configuration API root');
});

/**
 * @api {post} /config/ Create config entry
 * @apiName postConfig
 * @apiGroup config
 *
 * @apiParam {String} optionName Config entry unique name
 * @apiParam {String} value Config entry value
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "optionName": "twitter-consumer-key",
 *          "value": "2sad21f2fxzcv23rszdvcs8219vsfd"
 *      }
 *
 * @apiSuccess (200) {Boolean} error Should always be False
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.id Id of the created config entry in DB
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": False,
 *          "results": {
 *                  "id": "21fsdkg9342ijhgh9sf0234",
 *                  "name": "twitter-consumer-key",
 *                  "value": "2sad21f2fxzcv23rszdvcs8219vsfd"
 *              }
 *      }
 *
 * @apiUse DBError
 *
 * @apiError (400) {Object} EntryExists Config entry with provided name is already in DB, send back entry id for updates
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "ExtryExists",
 *          "error_details": "This config entry already exists",
 *          "results": {"id": "21dsa2t234tdsfsr141"}
 *      }
 */
router.post('/', (req, res) => {
    // Check if we have that entry already
    Config.find({
        'name': req.params.optionName
    }, (err, entries) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for entry',
                'results': {},
            });
        }
        if (entries.length !== 0) {
            // if exists return id for future requests
            return res.status(400).send({
                'error': 'EntryExists',
                'error_details': 'This config entry already exists',
                'results': {'id': entries[0]._id},
            });
        }
        new Config({
            'name': req.params.optionName,
            'value': req.body.value,
        }).save((err, entry) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    'error': 'DBError',
                    'error_details': 'Could not save new entry',
                    'results': {},
                });
            }
            return res.status(200).send({
                'error': False,
                'results': {'id': entry._id, 'name': entry.name, 'value': entry.value},
            });
        });
    });
});

export {router};
