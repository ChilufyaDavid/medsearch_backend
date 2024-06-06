var express = require('express');
var facilitiesRouter = express.Router();
const dbOperationsService = require('../services/dbOperationsService');


facilitiesRouter.get('/get', (req, res, next) => {
    const sql = 'SELECT * FROM facilities';
    const startIndex = Math.floor(Math.random() * 91);
    console.log(startIndex)
    dbOperationsService.pull(sql,(err,result)=> {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!result) {
            return res.status(404).json({ error: 'No facilities found' });
        }
        res.status(200).json(result.slice(startIndex, startIndex+10));
    });
});


module.exports = facilitiesRouter;
