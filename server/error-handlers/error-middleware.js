const { handleError } = require("../types/error");

const errorHandler = (error, request, response, next) => {
    handleError(error, response);
}

module.exports = {
    errorHandler,
};