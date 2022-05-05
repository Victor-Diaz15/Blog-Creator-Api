import {Request, Response, Router} from 'express'

class IndexRouter{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', (req, res) => res.send("api/post o api/user"))
    }
}
const indexRouter = new IndexRouter();
indexRouter.routes();

export default indexRouter.router;