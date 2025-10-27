"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
var express_1 = require("express");
var indexController_js_1 = require("../controllers/indexController.js");
var indexRouter = (0, express_1.Router)();
exports.indexRouter = indexRouter;
indexRouter.get("/", indexController_js_1.itemsListGet);
