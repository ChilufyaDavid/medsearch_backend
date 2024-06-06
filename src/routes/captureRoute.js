var express = require('express');
var captureRouter = express.Router();
const { getBox, createFile, getLastFileNumber,updateFile,getFiles, getPendingFiles, confirmFile } = require('../controllers/captureController')

/* GET users listing. */
captureRouter.post('/', getBox, function(req, res, next) {
  console.log(req.data)
  res.json(req.data);
});

captureRouter.post('/get-files', getFiles, function(req, res, next) {
  console.log(req.data)
  res.json(req.data);
});

captureRouter.get('/get-pending-files', getPendingFiles, function(req, res, next) {
  //console.log(req.data)
  res.json(req.data);
});


captureRouter.post('/get-last-file-number', getLastFileNumber, function(req, res, next) {
  console.log(req.data)
  res.json(req.data);
});

captureRouter.post('/add-files',createFile, function(req, res, next) {
  console.log("added route -------------------------", req.resData)
  res.json(req.resData);
});

captureRouter.post('/update-file',updateFile, function(req, res, next) {
  console.log("updated route -------------------------", req.resData)
  res.json(req.resData);
});

captureRouter.post('/confirm_document',confirmFile, function(req, res, next) {
  
  res.json(req.resData);
});


module.exports = captureRouter;
