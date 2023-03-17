import express , { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middlewares/error.middleware';
import helmet from 'helmet';


class App {
  public expess: Application;
  public port :number;

  constructor(controllers : Controller[] , port : number) {
    this.expess = express();
    this.port = port;

    this.intializeDatabaseConnection();
    this.initializeControllers(controllers);
    this.initializeMiddleware();
    this.initializeErrorHandling();
  }
  private initializeMiddleware() : void {
    this.expess.use(helmet())
    this.expess.use(cors());
    this.expess.use(morgan('dev'));
    this.expess.use(express.json());
    this.expess.use(express.urlencoded({ extended: true }));
    this.expess.use(compression());
  }

  private initializeControllers(controllers : Controller[]) : void {
    controllers.forEach((controller : Controller) => {
      this.expess.use('/api', controller.router);
    })
  }

  private intializeDatabaseConnection() : void {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_PATH}`);
  }

  private initializeErrorHandling() : void {
    this.expess.use(ErrorMiddleware);
  }

  public listen() : void {
    this.expess.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
      
    })
  }

}

export default App;