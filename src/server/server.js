import ServerHelper from "./helpers";

const initServer = async () => {
  //Create Server
  const server = ServerHelper.createServer();

  //Register All Plugins
  await ServerHelper.registerPlugins(server);

  //add views
  ServerHelper.addViews(server);

  //Default Routes
  ServerHelper.setDefaultRoute(server)

  ServerHelper.addSwaggerRoutes(server);

  ServerHelper.attachLoggerOnEvents(server);
  // Start Server
  ServerHelper.startServer(server);
}

export const startMyServer = () => {

  ServerHelper.configureLog4js();

  ServerHelper.connectMongoDB();

  // Global variable to get app root folder path
  ServerHelper.setGlobalAppRoot();

  process.on("unhandledRejection", err => {
    appLogger.fatal(err);
    process.exit(1);
  });

  initServer();
}
