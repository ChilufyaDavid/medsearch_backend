const dbConn = require('../../config/db.config')

exports.insert = (sql, callBack)=>
    dbConn.query(sql ,function (error, result) {
        if (error) {
            console.log('Error inserting data')
            console.log(error)
            callBack(error)
        } else {
            console.log('data added successfuly')
            console.log(result)
            //console.log(result)
            callBack(null,result)
        }
    });

exports.pull = (sql, callBack)=>
    dbConn.query(sql ,function (error, result) {
        if (error) {
            console.log('Error getting data')
            console.log(error)
            callBack(error)
        } else {
            console.log('data pulled successfuly')
           // console.log(result)
            //console.log(result)
            callBack(null,result)
        }
    });



exports.delete = (sql, callBack)=>{
    dbConn.query(sql ,function (error, result) {
        if (error) {
            console.log('Error deleting data')
            console.log(error)
            callBack(error)
        } else {
            console.log('data deleted successfuly')
            console.log(result)
            //console.log(result)
            callBack(result)
        }
    })
}

exports.update = (sql, callBack)=>{
    dbConn.query(sql ,function (error, result) {
        if (error) {
            console.log('Error updating data')
            console.log(error)
            callBack(error)
        } else {
            console.log('data updated successfuly')
            console.log(result)
            //console.log(result)
            callBack(result)
        }
    })
  }

