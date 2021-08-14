const config = require('./utils/config');
const express = require('express')
const app = express();
const cors = require('cors')
const courseRouter = require('./controllers/courses');
const logger = require('./utils/logger')
const middleware = require('./utils/middleware');

const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false})
  .then(() =>{
    logger.info(`Connected to MongoDB`,config.MONGODB_URI);
  })
  .catch((error) => {
    logger.error(`Error connection to MongoDB:`,error.message);
  })


app.use(cors());
app.use(express.json());

app.use('/api/courses',courseRouter)
app.use(middleware.requestLogger);

module.exports = app;