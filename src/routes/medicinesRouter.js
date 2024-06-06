var express = require('express');
var medicinesRouter = express.Router();
const dbOperationsService = require('../services/dbOperationsService');


medicinesRouter.get('/get', (req, res, next) => {
    const sql = 'SELECT * FROM medications';
    dbOperationsService.pull(sql,(err,result)=> {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!result) {
            return res.status(404).json({ error: 'No medicines found' });
        }
        res.status(200).json(result);
    });
});


module.exports = medicinesRouter;
