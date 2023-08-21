const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
});

const uploadImage = (image, folder) => {
    return cloudinary.uploader.upload(image, {
        folder,
        resource_type: 'image'
    });
};

module.exports = uploadImage;