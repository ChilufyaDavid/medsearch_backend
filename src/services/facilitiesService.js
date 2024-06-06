const dbConn = require('../../config/db.config')

const get = (callBack)=>{
    const query = 'SELECT * FROM facilities';
    dbConn.query(query ,function (error, result) {
        if (error) {
            console.log('Error getting data')
            console.log(error)
        callBack(error)
        } else {
        console.log('clients pulled successfuly')
        //console.log(result)
        callBack(result)
        }
    })
  }