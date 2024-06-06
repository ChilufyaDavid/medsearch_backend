var express = require('express');
var csvRouter = express.Router();
const path = require('path');
const {getDocs, writeToCSV } = require('../controllers/csvController');

csvRouter.get('/ab/:code', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../../', 'documents', `${req.params.code}.csv`);
    
    console.log('Attempting to send file:', filePath);

    res.sendFile(filePath, {
      headers: {
        'Content-Disposition': `attachment; filename=${req.params.code}.csv`,
      },
    }, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('File sent successfully:', filePath);
      }
    });
  } catch (error) {
    console.error('Error handling file request:', error);
    res.status(500).send('Internal Server Error');
  }
});


csvRouter.post('/write', getDocs, writeToCSV, (req, res, next) => {
    res.json(req.resData);
  }
);

csvRouter.get('/download/:code"', (req, res, next) => {
  console.log("Readeddddddddd")
  // Send the file as an attachment

  try {
    const filePath = path.join(__dirname, '../../../', 'documents', `${req.params.code}.csv`);
    
    res.sendFile(filePath, {
      headers: {
        'Content-Disposition': `attachment; filename=${req.params.code}.csv`,
      },
    });
  } catch (error) {
    console.error('Error sending file:', error);
    res.status(500).send('Internal Server Error');
  }

  }
);


module.exports = csvRouter;