var express = require('express');
var clientsRouter = express.Router();
const { create, get, getByCode } = require('../services/clientsService');

clientsRouter.post('/create', (req, res, next) => {
  create(req.body, (result)=> {
    res.json({
      'code': result.code,
      'status': result.status,
      'message': result.message,
      'data': result.data
    });
  });
});

clientsRouter.get('/get', (req, res, next) => {
  get((result)=> {
    res.json({
      'code': 200,
      'status': "success",
      'message': "clients pulled success",
      'data': result
    });
  });
});

clientsRouter.post('/get-by-code', (req, res, next) => {
  console.log(req.body.client_code)
  getByCode(req.body.client_code, (result)=> {
    res.json({
      'code': 200,
      'status': "success",
      'message': "clients pulled success",
      'data': result
    });
  });
});



module.exports = clientsRouter;
