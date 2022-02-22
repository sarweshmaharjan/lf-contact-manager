import express from "express";
import network from "./bin/www/server";
import plugins from "./bin/plugins/plugins";
import connect from "./api/config/databaseConfig";
import router from "./api/routes/router";

const app = express();
/**
 * Connect to Database: MongoDB
 * @function - connect
 */
connect();

/**
 * All plugins are present at.
 * @function - plugins
 * @param  app - constant of express().
 * @param express - express package.
 */
plugins(app, express);

/**
 * API routes.
 * @function - router
 * @param  app - constant of express function.
 */
router(app);

/**
 * Network setup - PORT and all.
 * @function - network
 * @param  app - constant of express function.
 */
network(app);
