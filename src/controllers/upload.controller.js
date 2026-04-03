const getImageUploadSignature = require("../services/upload.service");
const catchAsync = require("../utils/catchAsync");
const responseFn = require("../utils/responseFn");

const imageUploadsignature = catchAsync(async (req, res) => {
    const { folder } = req.query;
    const signatureData = getImageUploadSignature(folder);
    responseFn(res, 200, true, signatureData, 'Image upload signature generated successfully');
});

module.exports = {
    imageUploadsignature
};