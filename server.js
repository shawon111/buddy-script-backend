const app = require('./app');
const dotenv = require('dotenv');
const database = require('./src/config/database');
const errorHandler = require('./src/middlewares/error.middleware');
const cloudinaryConfig = require('./src/config/cloudinary');

// config dotenv
dotenv.config();

// cloudinary configuration
cloudinaryConfig();

const port = process.env.PORT || 5000;

// connect to database
database();

// error handling middleware
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Visit http://localhost:${port} to access the server`);
})