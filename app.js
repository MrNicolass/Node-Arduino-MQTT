var express = require('express');
var livereload = require('livereload');
var connectLivereload = require('connect-livereload');
var path = require('path');

//Local imports
var routes = require('./src/routes/routes');

//Define express main function and server port
var app = express();
const port = 3000;

//Define live reload and define the path to watch
const liveReloadServer = livereload.createServer();
liveReloadServer.watch([path.join(__dirname, 'src')]);

//Import functions, routes and static file
app.use(connectLivereload());
app.use(express.static(path.join(__dirname, 'src/assets')));
app.use(routes);

//Starts server and live reload
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
      liveReloadServer.refresh("/");
  }, 100);
});

module.exports = app;