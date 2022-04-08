"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', (req, res) => res.send("api/Posts"));
    }
}
const indexRouter = new IndexRouter();
indexRouter.routes();
exports.default = indexRouter.router;
