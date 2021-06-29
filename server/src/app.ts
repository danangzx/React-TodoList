import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes'

const app = express()
const PORT = process.env.PORT || 8080

const {
    MONGODB_ATLAS_USERNAME,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_DBNAME
} = process.env

const uri = `mongodb://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0-shard-00-00.ut9ox.mongodb.net:27017,cluster0-shard-00-01.ut9ox.mongodb.net:27017,cluster0-shard-00-02.ut9ox.mongodb.net:27017/${MONGODB_ATLAS_DBNAME}?ssl=true&replicaSet=atlas-oscl4u-shard-0&authSource=admin&retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(cors())
app.use(routes)

mongoose.set('useFindAndModify', true);
mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
