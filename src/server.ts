import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const router = express();

//! connect to Mongo
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('connected to mongoDB.');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect.');
    Logging.error(error);
  });

//! only start the server if mongo is connnected.
const StartServer = () => {
  router.use((req, res, next) => {
    //! Logging the request
    Logging.info(`incoming -> mentod [${req.method}] -url: [${req.url}] -IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      Logging.info(`Incoming -> method: [${req.method}] -URL: [${req.url}] -IP: [${req.socket.remoteAddress}] -status: [${req.statusCode}]`);
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //! Rules of our APIs
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
    }

    next();
  });

  //! Routes
  router.use('/authors', authorRoutes);
  router.use('/books', bookRoutes);

  //! HealthCheck
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  //! Error Handling
  router.use((req, res, next) => {
    const error = new Error('Not Found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
