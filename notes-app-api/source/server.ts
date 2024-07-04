/**
 * Imports necessary modules and sets up the server with middleware and routes.
 * @param {http} http - The HTTP module for creating the server.
 * @param {express} express - The Express module for setting up the server.
 * @param {Request} Request - The Request object from Express.
 * @param {Response} Response - The Response object from Express.
 * @param {Express} Express - The Express application instance.
 * @param {NextFunction} NextFunction - The NextFunction for middleware.
 * @param {morgan} morgan - The Morgan logger middleware for logging.
 * @param {mongoose} mongoose - The Mongoose module for MongoDB interactions.
 * @param {config} config - The configuration object for the
 */
import http from "http";
import express, { Request, Response, Express, NextFunction } from "express";
import morgan from "morgan";
import routes from "./routes";
import mongoose from "mongoose";
import config from "./common/config/config";
import logger from "./common/config/logger";
import cors from "cors";
import i18nextMiddleware from "i18next-express-middleware";
import i18next from "./common/middlewares/i18next";

/**
 * Initializes a new Express router instance.
 * @type {Express} router - The Express router instance.
 */
const router: Express = express();

/**
 * Sets up middleware for the Express router including i18next internationalization handling,
 * logging with morgan, parsing urlencoded and JSON request bodies, enabling CORS, and routing to
 * the specified routes.
 * @param {Object} i18nextMiddleware - The i18next middleware for internationalization handling.
 * @param {Object} morgan - The morgan logger middleware for logging requests.
 * @param {Object} express - The Express framework object.
 * @param {Object} cors - The CORS middleware for enabling Cross-Origin Resource Sharing.
 * @param {Object} routes - The routes to be used for routing requests.
 * @returns None
 */
router.use(i18nextMiddleware.handle(i18next));

router.use(morgan("dev"));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

router.use(cors({ origin: true }));

/**
 * Sets up the routes for the API and defines a GET endpoint for the root URL.
 * @param {string} "/" - The base URL for the routes.
 * @param {routes} routes - The routes to be used by the router.
 * @returns None
 */
router.use("/", routes);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to  API");
});

/**
 * Middleware function to handle requests for undefined endpoints.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns JSON response with a 404 status and an error message.
 */
router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Endpoint not found.");
  return res.status(404).json({
    message: error.message,
  });
});

/**
 * Event listener for unhandled promise rejections.
 * @param {any} reason - The reason for the rejection.
 * @param {Promise} promise - The promise that was rejected.
 * @returns None
 */
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

/**
 * Creates an HTTP server using the provided router and starts it on the specified port.
 * @param {Function} router - The router function to handle incoming requests.
 * @returns {http.Server} The HTTP server instance that has been created.
 */
const httpServer = http.createServer(router);

const PORT = +(process.env.PORT as string) || 6060;
let server: http.Server;

/**
 * Connects to the MongoDB database using the provided URL from the config object.
 * Logs a message once the connection is established and starts the server on the specified port.
 * @param {string} config.mongoose.url - The URL of the MongoDB database.
 * @returns None
 */
mongoose.connect(config.mongoose.url).then((result: any) => {
  logger.info(`Connected to MongoDB : ${config.mongoose.url}`);
  server = httpServer.listen(PORT, () =>
    console.log(`The server is running on port ${PORT}`)
  );
});

/**
 * Set the Mongoose debug option to true, enabling debug mode for Mongoose operations.
 * @param {string} "debug" - The debug option to set
 * @param {boolean} true - The value to set the debug option to
 * @returns None
 */
mongoose.set("debug", true);

/**
 * Handles the exit process by closing the server if it exists and then exiting the process.
 * If the server does not exist, it simply exits the process.
 * @returns None
 */
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

/**
 * Handles unexpected errors by logging the error and calling the exitHandler function.
 * @param {Error} error - The error that occurred.
 * @returns None
 */
const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

/**
 * Attaches an event listener to handle uncaught exceptions and unhandled rejections.
 * @param {string} event - The event to listen for ("uncaughtException" or "unhandledRejection").
 * @param {Function} handler - The function to handle the unexpected error.
 * @returns None
 */
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

/**
 * Listens for the SIGTERM signal and performs cleanup actions.
 * @param {string} "SIGTERM" - The signal to listen for.
 * @param {function} () - The callback function to execute when the signal is received.
 * @returns None
 */
process.on("SIGTERM", () => {
  logger.info(" received");
  if (server) {
    server.close();
  }
});
