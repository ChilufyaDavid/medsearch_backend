const dbConn = require('../../config/db.config')

const login = (email,callBack)=>{
  const query = 'SELECT * FROM consumers WHERE email = ?';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query, [email] ,function (error, result) {
        if (error) {
          console.log('Error geting user')
          console.log(error)
          callBack(error)
        } else {
          console.log('user pulled successfuly')
          console.log(result)
          callBack(null,result[0])
        }
      })
}

module.exports = {
  login
}