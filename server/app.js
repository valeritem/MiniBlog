import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import commentRoute from './routes/comments.js';

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

export default app;
