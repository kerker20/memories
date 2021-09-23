import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = 'mongodb+srv://admin:Keah1438@cluster0.ulmww.mongodb.net/memory?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server running at port: ${PORT}`)))
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false );
