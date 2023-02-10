import express from 'express';
import dotenv from 'dotenv'
import { errorSlackBotProfileDetails, getSlackClient, slackBotProfileDetails } from '../service/slack-webhook/index.js';

let app;
export const init = () => {
  dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });
  if (!app) {
    app = express();
  }

  const port = process.env.PORT || 3001;

  app.use(express.json());

  const slackClient = getSlackClient();

  app.get('/', (req, res) => {
    try {
      slackClient.send({
        ...slackBotProfileDetails,
        text: `Service 2 is up and running on port ${port}`
      })
      const message = 'Service 2 up and running!';
      res.json({message});
    } catch (error) {
      throw new Error(error)
    }
  });

  // error handler middleware
  app.use((error, req, res, next) => {
    slackClient.send({
      ...errorSlackBotProfileDetails,
      text: error.stack ,
    });
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!!'
    });
  })

  app.use((req, res, next) => {
    slackClient.send({
      ...errorSlackBotProfileDetails,
      text: `Route not found ${req.originalUrl} on service 2`,
    });
    res.status(404).send({
      status: 404,
      error: "Not found"
    })
  })
  
  app.listen(port, ()=> {
    console.log('Server 2 is up on port ' + port);
  });
};

init();

export { app };