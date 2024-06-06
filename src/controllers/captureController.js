const { fetchBox,fetchFiles,fetchPendingFiles, 
        fetchLastFileNumber, 
        submitFileAmend, 
        saveFile,
        confirmFile_ } = require('../services/captureService')
const { removeZeros } = require('../utils/formatUtil');
const { formattedCurrDate } = require('../utils/formatDate');

const getBox = (req,res,next) => {
    console.log("callede", req.body)
    req.body.box_number = removeZeros(parseInt(req.body.box_number));
    console.log(req.body)
    fetchBox(req.body, (result) => {
        req.data = result
        next()
    })
}

const getFiles = (req,res,next) => {
    req.body.box_number = removeZeros(parseInt(req.body.box_number));
    console.log(req.body)
    fetchFiles(req.body, (result) => {
        req.data = result
        next()
    })
}

const getPendingFiles = (req,res,next) => {
    fetchPendingFiles((result) => {
        req.data = result
        next()
    })
}

const getLastFileNumber = (req,res,next) => {
    console.log(req.body)
    req.body.box_number = removeZeros(parseInt(req.body.box_number));
    fetchLastFileNumber(req.body, (result) => {
        if(result.length > 0){
            req.data = result[0].document_number
        }else{
            req.data = 0
        }
        next()
    })
}

const createFile = (req,res,next) => {
    console.log(req.body)
    req.body.box_number = removeZeros(parseInt(req.body.box_number));
    req.body.date_created = formattedCurrDate;

    fetchLastFileNumber({
            'box_number' : req.body.box_number,
            'client_code': req.body.client_code
        }, 
        (result) => {
            
            let DocNO = result.length === 0 ? 1 : parseInt(result[0].document_number)+1;
            let isDone = false;
            req.body.data.forEach((data, index) => { 
                DocNO +1;
                console.log("First DATTTTTTTTTTTTTTTTTTTTTTTTTT ENTEREDDDDDDDDDDDDD", index, DocNO)
                saveFile({ //space trime
                    'client_code':req.body.client_code,
                    'box_id':req.body.box_id,
                    'box_number': req.body.box_number,
                    'document_number':DocNO + index,
                    'created_by': req.body.created_by,
                    'date_created' : req.body.date_created,
                    'box_number' : req.body.box_number,
                    'location' : req.body.location,
                    'type': data[1],
                    'description1': data[2],
                    'description2': data[3],
                    'from': data[4],
                    'to': data[5],
                    'retention': data[6],
                }, (result2) => {
                   
                    if (index === req.body.data.length - 1) {
                        console.log("First DATTTTTTTTTTTTTTTTTTTTTTTTTT ", index)
                        req.resData = {
                            message: `Document Inserted ${result2}`,
                            code: 202,
                            status: "Ok"
                        }
                        isDone = true;
                        next()
                      }else if(req.body.data.length === 1){
                        req.resData = {
                            message: `Document Inserted ${result2}`,
                            code: 202,
                            status: "Ok"
                        }
                        isDone = true;
                        next()
                      }

                });
                
            });
    })
   
    
}

const updateFile = (req,res,next) => {
    let isDone = false;
    req.body.data.forEach((data, index) => { 
        console.log("First DATTTTTTTTTTTTTTTTTTTTTTTTTT ENTEREDDDDDDDDDDDDD", index, data)
        submitFileAmend({ //space trime
            'id':data[9],
            'type': data[2],
            'description1': data[3],
            'description2': data[4],
            'from': data[5],
            'to': data[6],
            'retention': data[7],
        }, (result2) => {
            
            if (index === req.body.data.length - 1) {
                console.log("First DATTTTTTTTTTTTTTTTTTTTTTTTTT ", index)
                req.resData = {
                    message: `Document Inserted ${result2}`,
                    code: 202,
                    status: "Ok"
                }
                isDone = true;
                next()
                }else if(req.body.data.length === 1){
                    req.resData = {
                        message: `Document Inserted ${result2}`,
                        code: 202,
                        status: "Ok"
                    }
                    isDone = true;
                    next()
                  }

        });
        
    });
}

const confirmFile = (req,res,next) => {
    console.log("Confirm file controller calledssssssssssss ", req.body)
    let isDone = false;
    req.body.data.forEach((id, index) => { 
        console.log("First DATTTTTTTTTTTTTTTTTTTTTTTTTT ENTEREDDDDDDDDDDDDD", index, id)
        confirmFile_({ 'id':id }, (result2) => {
            if (index === req.body.data.length - 1) {
                console.log("First DATTTTTTTTTTTTTTTTTTTTTTTTTT ", index)
                req.resData = {
                    message: `Document Updated ${result2}`,
                    code: 202,
                    status: "Ok"
                }
                isDone = true;
                next()
                }
        });
        
    });
}

module.exports = {
    getBox,
    createFile,
    updateFile,
    getFiles,
    getPendingFiles,
    getLastFileNumber,
    confirmFile
}