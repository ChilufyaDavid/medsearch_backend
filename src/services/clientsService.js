const dbConn = require('../../config/db.config')

const create = (data,callBack)=>{
  const query = 'INSERT INTO clients SET ?';
    dbConn.query(query, data, function (error, result) {
        if (error) {
          console.log(error)
          callBack({'message' : "Error Creating Client",
                    'status' : "error",
                    'code' : 505,
                    'data' : ""
                  })
        } else {
          console.log('client created successfuly')
          callBack({
            'message' : "Client created successfuly",
            'data':result,
            'status' : "success",
            'code' : 202,
            })
        }
      })
}

const get = (callBack)=>{
  const query = 'SELECT * FROM clients';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query ,function (error, result) {
        if (error) {
          console.log('Error geting user')
          console.log(error)
          callBack(error)
        } else {
          console.log('clients pulled successfuly')
          //console.log(result)
          callBack(result)
        }
      })
}

const getByCode = (data, callBack)=>{
  const query = 'SELECT * FROM clients WHERE code = ?';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query ,[data], function (error, result) {
        if (error) {
          console.log('Error geting user')
          console.log(error)
          callBack(error)
        } else {
          console.log('clients pulled successfuly')
          //console.log(result)
          callBack(result)
        }
      })
}

module.exports = {
  create,
  get,
  getByCode
}