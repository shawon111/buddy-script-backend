const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// appp configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors configuration
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// routes
const authroutes = require('./src/routes/auth.route');
const postRoutes = require('./src/routes/post.route');

app.use('/api/auth', authroutes);
app.use('/api/posts', postRoutes);

// entry route
app.get('/', (req, res) => {
    res.status(200).json({
        data: {
            message: 'Welcome to BuddyScript API'
        },
        success: true,
    });
});

module.exports = app;
