import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors'

import indexRouter from './routers/IndexRouter';
import postRouter from './routers/PostRouter';

class Server{

    //variables
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        //Conecction to Mongodb
        const MONGO_URI = 'mongodb://localhost/RestApiTsExpress';
        //mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI)
        .then(db => console.log("Db is connected"));
        //Settings
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes(){
       this.app.use(indexRouter);
       this.app.use('/api/posts', postRouter);
    }

    start(){
        this.app.listen(this.app.get('port'), () =>{
            console.log('Server on port', this.app.get('port'));
        });

    }
}

const server = new Server();
server.start();