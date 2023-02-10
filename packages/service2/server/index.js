import express from 'express';
import dotenv from 'dotenv'

let app;
export const init = () => {
  dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });
  if (!app) {
    app = express();
  }

  const port = process.env.PORT || 3001;

  app.use(express.json());

  app.get('/', (req, res) => {
    try {
      const message = 'Service 2 up and running!';
      res.json({message});
    } catch (error) {
      throw new Error(error)
    }
  });

  // error handler middleware
  app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!!'
    });
  })

  app.use((req, res, next) => {
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