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
 * @apiDefine TwError
 *
 * @apiError (500) {Object} TwError
 *
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 500 InternalServerError
 *      {
 *          "error": "TwError",
 *          "error_details": "some Twitch api error description",
 *          "results": {}
 *      }
 */
