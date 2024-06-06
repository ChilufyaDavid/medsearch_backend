const dbConn = require('../../config/db.config')

const fetchBox = (data,callBack)=>{
  const query = 'SELECT * FROM boxes WHERE client_code = ? AND box_number = ? LIMIT 1';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query, [data.client_code, data.box_number] ,function (error, result) {
        if (error) {
          console.log('Error geting box')
          console.log(error)
          callBack(error)
        } else {
          console.log('box pulled successfuly')
          //console.log(result)
          callBack(result)
        }
        
      })
}

const fetchFiles = (data,callBack)=>{
  const query = 'SELECT * FROM documents WHERE client_code = ? AND box_number = ?';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query, [data.client_code, data.box_number] ,function (error, result) {
        if (error) {
          console.log('Error geting documents')
          console.log(error)
          callBack(error)
        } else {
          console.log('documents pulled successfuly')
          //console.log(result)
          callBack(result)
        }
        
      })
}

const fetchPendingFiles = (callBack)=>{
  const query = 'SELECT * FROM documents WHERE status_pending_submit != ?';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query, [0],function (error, result) {
        if (error) {
          console.log('Error geting documents')
          console.log(error)
          callBack(error)
        } else {
          console.log('documents pulled successfuly')
          //console.log(result)
          callBack(result)
        }
        
      })
}

const fetchLastFileNumber = (data,callBack)=>{
  const query = 'SELECT document_number FROM documents WHERE box_number = ? AND client_code = ? ORDER BY id DESC LIMIT 1';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query, [data.box_number, data.client_code ] ,function (error, result) {
        if (error) {
          console.log('Error geting box')
          console.log(error)
          callBack(error)
        } else {
          console.log('Last Document number pulled successfuly')
          console.log(result)
          callBack(result)
        }
        
      })
}

const saveFile = (data, callBack) => {
  console.log("SAVE Calleddddddddddddddd")

  dbConn.query('INSERT INTO documents SET ?', data, function (error, result) {
      if (error) {
        console.log('Error inserting document', error)
      } else {
        console.log('document inserted successfuly')
      }
      callBack(result.insertId)
    })
}

const submitFileAmend = (data, callBack) => {
    const query = 'UPDATE documents SET type = ?, description1 = ?, description2 = ?, `from` = ?, `to` = ?, retention = ?, status_pending_submit = ? WHERE id = ?';
    dbConn.query(query, [data.type, data.description1, data.description2, data.from, data.to,data.retention,2,data.id], function (error, result) {
        if (error) {
          console.log('Error updating document')
          console.log(error)
        } else {
          console.log('document updated successfuly', result.affectedRows, data.id)
        }
        
        callBack(result.insertId)
      })
  }

const confirmFile_ = (id, callBack) => {

  const query = 'UPDATE documents SET status_pending_submit = ? WHERE id = ?';
    dbConn.query(query, [0, id.id], function (error, result) {
        if (error) {
          console.log('Error updating document')
          console.log(error)
        } else {
          console.log('document updated successfuly1111', result.affectedRows, id.id)
        }
        
        callBack(result.affectedRows)
      })

}

module.exports = {
    fetchBox,
    fetchFiles,
    fetchPendingFiles,
    fetchLastFileNumber,
    submitFileAmend,
    saveFile,
    confirmFile_
}