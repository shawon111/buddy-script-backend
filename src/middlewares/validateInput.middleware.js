const catchAsync = require("../utils/catchAsync");

function validateInput(schema) {
    return catchAsync(async (req, res, next) => {
        req.body = schema.parse(req.body);
        next();
    })
}

module.exports = validateInput;