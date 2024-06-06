const dbConn = require('../../config/db.config')

const register = (data,callBack)=>{
  const query = 'INSERT INTO users SET ?';
    dbConn.query(query, data, function (error, result) {
        if (error) {
          console.log('Error creating user')
          console.log(error)
          callBack(error)
        } else {
          console.log('user created successfuly')
          callBack(result)
        }
      })
}

module.exports = {
    register
}