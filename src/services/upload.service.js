const cloudinary = require('cloudinary').v2;

const getImageUploadSignature = (folder = 'uploads/posts') => {
    const timestamp = Math.floor(Date.now() / 1000);
    // resource_type
    const resource_type = 'image';
    // allowed_formats
    const allowed_formats = ['jpg', 'jpeg', 'png'];
    // generate signature
    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        process.env.CLOUDINARY_API_SECRET
    );

    return {
        signature,
        timestamp,
        api_key: process.env.CLOUDINARY_API_KEY,
        folder,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    };
};

module.exports = getImageUploadSignature;