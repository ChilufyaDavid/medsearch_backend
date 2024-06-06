const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const path = require('path');
const dbConn = require('../../config/db.config')

const setDestruction = (to, retention) => {
    
  let year_ = "not set"
  let month_ = "00"
  if(to != undefined && retention != undefined ){
    if(to.length > 4 ){
      year_ = parseInt(to.slice(-4)) + parseInt(retention)
      if(to.length >= 7){
        const first = to.charAt(to.length - 7);
        const second = to.charAt(to.length - 6);
        month_ = `${first}${second}`
      }
    }
  }
  return `${month_}/${year_}`;
}

const writeToCSV = (req,res,next) => {
      
    if(req.docs_data.length === 0){
      console.log("There is no data")
      req.resData = {
        'code': 202,
        'status': "no data",
        'data': req.docs_data
      }
      next();
    }
      let data = [];
      req.docs_data.forEach((value) => {
        data.push(
          { document_number:`${value.id}* ${value.document_number}`,
            box_number: value.box_number,
            type:value.type,
            description1:value.description1,
            description2:value.description2,
            from:value.from,
            retention:value.retention,
            location: value.location,
            destruction: setDestruction(value.to, value.retention)
          } 
        )
         
      })
      console.log("Processed",data)
      
      // Define the CSV header
      const csvHeader = [
        {id:'document_number', title:'Key'},
        {id:'box_number',title:'Box No'},
        {id:'type', title: 'Type'},
        {id:'description1', title: 'Description1'},
        {id:'description2', title: 'Description2'},
        {id:'from', title: 'From'},
        {id:'retention',  title:'Retention'},
        {id:'location',title: 'Location'},
        {id:'destruction',title: 'Destruction'}
      
      ];
    
      // Create a CSV writer
      const csvWriter = createCsvWriter({
        path: path.join( '..', 'documents', `${req.body.client_code}.csv`),
        header: csvHeader,
        overwrite: true
      });
      
      // Write the data to the CSV file
      csvWriter
        .writeRecords(data)
        .then(() => {
          // Send the CSV file as a response
          //res.attachment(`${req.body.client_code}.csv`);
          //res.sendFile(`${req.body.client_code}.csv`, { root: __dirname });
          req.resData = {
            'code': 202,
            'status': "file created",
            'data': ""
          }
          next();

        })
        .catch((err) => {
          console.error('Error writing CSV file:', err);
          res.status(500).send('Internal Server Error');
        });

}

const getDocs = (req,res,next) => {
  const query = 'SELECT * FROM documents WHERE client_code = ? ';
    //const values = [interview.email, JSON.stringify(interview.data)];
      dbConn.query(query, req.body.client_code ,function (error, result) {
          if (error) {
            console.log('Error geting documents')
            console.log(error)
            callBack(error)
          } else {
            console.log('documents pulleda successfuly')
            //console.log(result)
            req.docs_data = result;
            next()
          }
    });
}


module.exports = { 
    writeToCSV,
    getDocs,
}