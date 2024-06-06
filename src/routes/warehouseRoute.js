var express = require('express');
var { createRack, createRackLevel, getLocation, getBoxIndex, createBox, getLastRackNo} = require('../controllers/warehouseController')

var warehouseRouter = express.Router();

/* GET users listing. */
warehouseRouter.post('/', createRack, createRackLevel, function(req, res, next) {
  res.json(req.resData);
});

warehouseRouter.get('/last_rack_no', getLastRackNo, function(req, res, next) {
  res.json(req.resData);
});

warehouseRouter.get('/get-location', getLocation, function(req, res, next) {
  if(!req.bayFull){ // if bay is full run the app again
    next()
  }else{
    res.json(req.location);
  }}
  ,getLocation, (req, res, nex) => {
    res.json(req.location);
  }
  );

warehouseRouter.post('/get-box-no-by-client', getBoxIndex, function(req, res, next) {
  res.json(req.data);
}); 

warehouseRouter.post('/create-box', createBox, function(req, res, next) {
  res.json("s");
});

module.exports = warehouseRouter;
