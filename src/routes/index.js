var express = require('express');
var warehouseRouter = require('./warehouseRoute');
var captureRouter = require('./captureRoute');
var userRouter = require('./userRouter');
var clientsRouter = require('./clientsRouter');
var facilitiesRouter = require('./facilitiesRouter');
var medicinesRouter = require('./medicinesRouter');
var csvRouter = require('./csvRoute');

var router = express.Router();

const defaultRoutes = [
  {
    path: '/capture',
    route: captureRouter
  },
  {
    path: '/warehouse',
    route: warehouseRouter
  },
  {
    path: '/user',
    route: userRouter
  },
  {
    path: '/facilities',
    route: facilitiesRouter
  },
  {
    path: '/medicines',
    route: medicinesRouter
  },
  {
    path: '/clients',
    route: clientsRouter
  },
  {
    path: '/csv',
    route: csvRouter
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
