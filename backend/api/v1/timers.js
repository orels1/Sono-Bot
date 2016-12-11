/**
 * Twitch chat timers for any notifications you might want
 */

import express from 'express';
let router = express.Router();
import {client} from 'backend/twitchapi';
import Timer from 'models/timer';

export {router};

/**
 * @apiDefine TimerRequestSuccess
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {String} results.id Id of the timer
 * @apiSuccess (200) {String} results.name Unique name of the timer
 * @apiSuccess (200) {String} results.text Message to post
 * @apiSuccess (200) {Number} results.frequencyTime Timer frequency (in minutes)
 * @apiSuccess (200) {Number} results.frequencyLines Timer frequency (in lines of chat)
 * @apiSuccess (200) {Date} results.created Date and time of creation
 * @apiSuccess (200) {Boolean} results.active Active state of the timer
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "_id": "21fsdkg9342ijhgh9sf0234",
 *                  "name": "donate",
 *                  "text": "donate here!",
 *                  "frequencyTime": 20,
 *                  "frequencyLines": 20,
 *                  "created": ISODate('2016-11-20T21:39:21Z'),
 *                  "active": false
 *              }
 *      }
 */

/**
 * @apiDefine TimerNotFound
 *
 * @apiError (404) {Object} TimerNotFound
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 404 NotFound
 *      {
 *          "error": "TimerNotFound",
 *          "error_details": "Requested timer is not found",
 *          "results": {}
 *      }
 */

/**
 * @apiDefine NotEnoughArgs
 * @apiError (400) {Object} NotEnoughArgs Not enough arguments provided
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "NotEnoughArgs",
 *          "error_details": "Not enough arguments provided",
 *          "results": {}
 *      }
 */

/**
 * @api {get} /timers/ List all timers
 * @apiVersion 0.0.1
 * @apiName getTimerslist
 * @apiGroup timers
 *
 * @apiUse DBError
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 * @apiSuccess (200) {Array} results.list List of timers
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {
 *                  "list": [
 *                      {
 *                         "_id": "21fsdkg9342ijhgh9sf0234",
 *                         "name": "donate",
 *                         "text": "donate here!",
 *                         "frequencyTime": 20,
 *                         "frequencyLines": 20,
 *                         "created": ISODate('2016-11-20T21:39:21Z'),
 *                         "active": false
 *                     }
 *                  ]
 *              }
 *      }
 */
router.get('/', (req, res) => {
    Timer.find({}, (err, timers) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not list timers',
                'results': {},
            });
        }
        return res.status(200).send({
            'error': false,
            'results': {
                'list': timers,
            },
        });
    });
});

/**
 * @api {post} /timer/ Create timer
 * @apiVersion 0.0.1
 * @apiName postTimer
 * @apiGroup timers
 *
 * @apiParam {String} name Timer unique name
 * @apiParam {String} text Message to post
 * @apiParam (200) {Number} frequencyTime Timer frequency (in minutes)
 * @apiParam (200) {Number} frequencyLines Timer frequency (in lines of chat)
 * @apiParam (200) {Boolean} active Active state of the timer
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "name": "donate"
 *          "text": "donate here!",
 *          "frequencyTime": 20,
 *          "frequencyLines": 20,
 *          "active": true
 *      }
 *
 * @apiUse DBError
 * @apiUse TimerRequestSuccess
 * @apiUse NotEnoughArgs
 *
 * @apiError (400) {Object} TimerExists Such timer is already in DB, send back timer id for updates
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 400 BadRequest
 *      {
 *          "error": "TimerExists",
 *          "error_details": "This timer already exists",
 *          "results": {"id": "21dsa2t234tdsfsr141"}
 *      }
 */
router.post('/', (req, res) => {
    // check if enought arguments for timer creation
    if (!req.body.name && !req.body.text) {
        return res.status(400).send({
            'error': 'NotEnoughArgs',
            'error_details': 'Not enough arguments provided',
            'results': {},
        });
    }
    // Check if we have that timer already
    Timer.findOne({
        'name': req.body.name
    }, (err, timer) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for timer',
                'results': {},
            });
        }
        if (timer) {
            // if exists return id for future requests
            return res.status(400).send({
                'error': 'TimerExists',
                'error_details': 'This timer already exists',
                'results': {'id': timer._id},
            });
        }
        return new Timer({
            'name': req.body.name,
            'text': req.body.text,
            'frequencyTime': req.body.frequencyTime,
            'frequencyLines': req.body.frequencyLines,
            'active': req.body.active,
        }).save((err, timer) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    'error': 'DBError',
                    'error_details': 'Could not save new timer',
                    'results': {},
                });
            }
            return res.status(200).send({
                'error': false,
                'results': timer,
            });
        });
    });
    return null;
});

/**
 * @api {get} /timers/:timerName Get speciefic timer
 * @apiVersion 0.0.1
 * @apiName getTimer
 * @apiGroup timers
 *
 * @apiParam {String} tiemrName Timer name to get
 *
 * @apiUse DBError
 * @apiUse TimerRequestSuccess
 * @apiUse TimerNotFound
 */
router.get('/:timerName', (req, res) => {
    Timer.findOne({
        'name': req.params.timerName,
    }, (err, timer) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for timer',
                'results': {},
            });
        }
        if (!timer) {
            // if does not exist - return NotFound
            return res.status(404).send({
                'error': 'TimerNotFound',
                'error_details': 'There is no such timer',
                'results': {},
            });
        }
        return res.status(200).send({
            'error': false,
            'results': timer,
        });
    });
});

/**
 * @api {put} /timers/ Update timer
 * @apiVersion 0.0.1
 * @apiName putTimer
 * @apiGroup timers
 *
 * @apiParam {String} id Timer ID in DB
 * @apiParam {String} name Timer unique name
 * @apiParam {String} text Message to post
 * @apiParam (200) {Number} frequencyTime Timer frequency (in minutes)
 * @apiParam (200) {Number} frequencyLines Timer frequency (in lines of chat)
 * @apiParam (200) {Boolean} active Active state of the timer
 *
 * @apiParamExample {json} Request-Example:
 *      {
 *          "name": "donate"
 *          "text": "donate here!",
 *          "frequencyTime": 20,
 *          "frequencyLines": 20,
 *          "active": true
 *      }
 *
 * @apiUse DBError
 * @apiUse TimerRequestSuccess
 * @apiUse TimerNotFound
 * @apiUse NotEnoughArgs
 */
router.put('/', (req, res) => {
    // check if an id was provided
    if (!req.body.id) {
        return res.status(400).send({
            'error': 'NotEnoughArgs',
            'error_details': 'Not enough arguments provided',
            'results': {},
        });
    }
    // Check if we have that timer
    Timer.findById(req.body.id, (err, timer) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not check for timer',
                'results': {},
            });
        }
        if (!timer) {
            // if does not exist - return NotFound
            return res.status(404).send({
                'error': 'TimerNotFound',
                'error_details': 'There is no such timer',
                'results': {},
            });
        }
        // update with the new values (if provided)
        timer.name = req.body.name ? req.body.name : timer.name;
        timer.text = req.body.text ? req.body.text : timer.text;
        timer.frequencyTime = req.body.frequencyTime ? req.body.frequencyTime : timer.frequencyTime;
        timer.frequencyLines = req.body.frequencyLines ? req.body.frequencyLines : timer.frequencyLines;
        timer.active = req.body.active ? req.body.active : timer.active;
        return timer.save((err, timer) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    'error': 'DBError',
                    'error_details': 'Could not update timer',
                    'results': {},
                });
            }
            return res.status(200).send({
                'error': false,
                'results': timer,
            });
        });
    });
    return null;
});

/**
 * @api {delete} /timers/:id Delete timer by id
 * @apiVersion 0.0.1
 * @apiName deleteTimer
 * @apiGroup timers
 *
 * @apiParam {String} id Timer id
 *
 * @apiUse DBError
 * @apiUse EntryNotFound
 *
 * @apiSuccess (200) {Boolean} error Should always be false
 * @apiSuccess (200) {Object} results Contains the results of Request
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "error": false,
 *          "results": {}
 *      }
 */
router.delete('/:id', (req, res) => {
    Timer.findByIdAndRemove(req.params.id, (err, entry) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                'error': 'DBError',
                'error_details': 'Could not find timer',
                'results': {},
            });
        }
        if (!entry) {
            // if does not exist - return NotFound
            return res.status(400).send({
                'error': 'EntryNotFound',
                'error_details': 'There is no such timer',
                'results': {},
            });
        }
        // successfully deleted entry
        return res.status(200).send({
            'error': false,
            'results': {},
        });
    });
});
