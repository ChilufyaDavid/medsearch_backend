const dbConn = require('../../config/db.config')

const addRack = (rack,createLevel)=>{
    dbConn.query('INSERT INTO racks SET ?', rack, function (error, result) {
        if (error) {
          console.log('Error creating rack')
          console.log(error)
        } else {
          console.log('rack created successfuly')
          createLevel(result.insertId)
        }
      })
}

const addRackLevel = (level, callback) => {
    dbConn.query('INSERT INTO rack_levels SET ?', level, function (error, result) {
        if (error) {
          console.log('Error creating rack level')
          console.log(error)
        } else {
          console.log('rack level created successfuly')
        }
        callback(result.insertId)
      })
}

const addBay = (data) => {
  dbConn.query('INSERT INTO bays SET ?', data, function (error, result) {
      if (error) {
        console.log('Error creating bay')
        console.log(error)
      } else {
        console.log('bay created successfuly')
      }
      //callback(result.insertId)
    })
}

const getRacks = (callBack)=>{
  const query = 'SELECT * FROM racks WHERE available = ? LIMIT 1';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query ,true, function (error, result) {
        if (error) {
          console.log('Error geting racks')
          console.log(error)
          callBack(error)
        } else {
          console.log('racks pulled successfuly')
          callBack(result[0])
        }
      })
}

const getLastRackNumber = (callBack)=>{
  const query = 'SELECT last_no FROM racks ORDER BY id DESC LIMIT 1';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query ,true, function (error, result) {
        if (error) {
          console.log('Error geting racks')
          console.log(error)
          callBack(error)
        } else {
          console.log('rack no pulled successfuly')
          callBack(result[0])
        }
      })
}

const getRLevelByRackId = (id, callBack) => {
  const query = 'SELECT * FROM rack_levels WHERE available = ? AND rack_id = ? LIMIT 1';
  //const values = [interview.email, JSON.stringify(interview.data)];
    dbConn.query(query ,[true, id], function (error, result) {
        if (error) {
          console.log('Error geting rack_level')
          console.log(error)
          //callBack(error)
        } else {
          console.log('rack_level pulled successfuly')
          //console.log(result)
          callBack(result[0])
        }
      })

}

const getBayByLevelId = (id, callBack) => {
  const query = 'SELECT * FROM bays WHERE available = ? AND level_id = ? LIMIT 1';
    dbConn.query(query ,[true, id], function (error, result) {
        if (error) {
          console.log('Error getting bays')
          console.log(error)
          //callBack(error)
        } else {
          console.log('bay pulled successfuly')
          //console.log(result[0])
          callBack(result[0])
        }
      });
}

const getBoxNumber = (code, callBack) => {
  const query = 'SELECT * FROM boxes WHERE client_code = ? ORDER BY id DESC LIMIT 1';
    dbConn.query(query ,[code], function (error, result) {
        if (error) {
          console.log('Error getting box')
          console.log(error)
          //callBack(error)
        } else {
          console.log('box pulled successfuly')
          //console.log(result[0])
          callBack(result)
        }
      });
}

const fetchBoxIndex = (callBack) => {
  const query = 'SELECT * FROM boxes ORDER BY id DESC LIMIT 1';
    dbConn.query(query , function (error, result) {
        if (error) {
          console.log('Error getting box')
          console.log(error)
          //callBack(error)
        } else {
          console.log('boxes pulled successfuly')
          //console.log(result[0])
          callBack(result)
        }
      });
}

const addBox = (data, callBack) => {
  dbConn.query('INSERT INTO boxes SET ?', data, function (error, result) {
      if (error) {
        console.log('Error creating box')
        console.log(error)
      } else {
        console.log('box created successfuly')
      }
      callBack(result.insertId)
    })
}

const getBayByLevelBay = (data, callBack) => {
  const query = 'SELECT * FROM bays WHERE bay_code = ? AND level = ? LIMIT 1';
    dbConn.query(query ,[data.bay_code, data.level], function (error, result) {
        if (error) {
          console.log('Error getting bays')
          console.log(error)
          //callBack(error)
        } else {
          console.log('bay pulled successfuly')
          //console.log(result[0])
          callBack(result[0])
        }
      });
}

const updateBaySlot = (data, callBack) => {
  const query = 'UPDATE bays SET location = ? WHERE level = ? AND bay_code = ?';
    dbConn.query(query ,[data.location, data.level, data.bay_code], function (error, result) {
        if (error) {
          console.log('Error updating bays')
          console.log(error)
          //callBack(error)
        } else {
          console.log('bay updated successfuly')
          console.log(data)
          callBack("")
        }
      });
}

const updateBayAvailability = (data, callBack) => {
  const query = 'UPDATE bays SET available = ? WHERE id = ? ';
    dbConn.query(query ,[false, data], function (error, result) {
        if (error) {
          console.log('Error updating bays')
          console.log(error)
          //callBack(error)
        } else {
          console.log('bay updated successfuly')
          console.log(data)
          callBack("")
        }
      });
}

module.exports = {
    addRack,
    addRackLevel,
    addBay, getRacks, getRLevelByRackId, getBayByLevelId,
    getBoxNumber, fetchBoxIndex,
    addBox,
    getBayByLevelBay,
    updateBaySlot,
    updateBayAvailability,
    getLastRackNumber
}