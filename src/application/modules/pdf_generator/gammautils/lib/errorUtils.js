/* jshint ignore:start */

var httpUtils = require('./httpUtils');

module.exports.__name = 'Error';

function HttpClientError(messageToClient, statusCode, data) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    if(typeof statusCode === 'undefined') {
        statusCode = 400;
    } else if(isNaN(parseInt(statusCode, 10))) {
        data = statusCode;
        statusCode = 400;
    }

    if(typeof statusCode !== 'number' || statusCode < 400 || statusCode >= 500) {
        throw new Error('Status code should be a number between 400 and 499');
    }

    this.messageToClient = messageToClient || httpUtils.statuses[statusCode];
    this.statusCode = statusCode,
    this.data = data || {},
    this.message = 'Error caused by user behavior: ' + (messageToClient || 'no details given');
    this.name = 'HttpClientError';
}

HttpClientError.prototype.__proto__ = Error.prototype;

module.exports.HttpClientError = HttpClientError;
/* jshint ignore:end */