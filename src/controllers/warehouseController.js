const { addRack, addRackLevel, addBay, 
        getRacks, getRLevelByRackId, getBayByLevelId,
        fetchBoxIndex,getBoxNumber, addBox, getBayByLevelBay, updateBaySlot, updateBayAvailability, getLastRackNumber } = require('../services/warehouseServices');
const { formatIndex } = require('../utils/formatUtil')

const getLastRackNo = (req, res, next) => {
    getLastRackNumber((result)=>{
        req.resData = result;
        next()
    });
}

const createRack = (req, res, next) => {
    addRack({
        'first_no': req.body.rack.first_no,
        'last_no': req.body.rack.last_no,
        'levels': req.body.rack.levels,
        'available' : true,
    }, (rackId)=>{
        req.rack_id = rackId;
        next()
    });
}

const createRackLevel = (req, res, next) => {
    console.log(req.rack_id)
    req.body.levels.forEach((level, index) => {
        level.rack_id = req.rack_id;
        level.available = true;
        addRackLevel(level, (levelId) => { // now create bays per level
            for(var i = req.body.rack.first_no; i <= req.body.rack.last_no; i++){
                addBay({
                    'level_id': levelId,
                    'rack_id' : req.rack_id,
                    'level' : level.level,
                    'bay_code' : i,
                    'available' : true,
                    'location' : JSON.stringify({
                        '1': [],
                        '2': [],
                        '3': [],
                        '4': [],
                        '5': [],
                        '6': [],
                        '7': [],
                        '8': []
                    }) //will store the occupied numbers, starts out empty for flexibilty reasons and because a bay has no location
                });
            }
        });
    });
    req.resData = {
        message: "Rack created",
        code: 202,
        status: "Ok"
    }
    next()
}

const getLocation = async (req, res, next) => {
    
    //check from racks for available space, when found get available rack_id
    //use rack_id to check available levels, when found get level id,
    //use level_id to get available bays, once found, create location and insert
    //after insertion, confirm if theres more space on bay, if not, update bay as full
    getRacks((rack) => {
        console.log("Box index -------------uuuuuuuuuuuu", rack)
        if(rack !== undefined){
            getRLevelByRackId(rack.id, (level) => {
                console.log(rack.id)
                getBayByLevelId(level.id, (bay) => {
                    console.log(bay)
                    //level.rows is the number of rows in a level
                    let bayObj = createLocationObect(bay, level.rows);
                    console.log(bayObj);
                    if(bayObj !== undefined) { //if bay is not full
                        if(createLocationNo(bayObj) === null){
                            req.location = createLocationNo(bayObj);
                            console.log("-----------------------------")
                        }else{
                            
                            req.location = createLocationNo(bayObj);
                            req.bayFull = false;
                            next();
                        }
                    }else{
                        updateBayAvailability(bay.id,(_) => {
                            //getRacks()
                            req.bayFull = true;
                            next();
                            req.location = "Bay Full"
                        })
                        console.log("Update bay")
                    }
                    
                     //to do go to next colum if full
                    
                })
            })
        }else{
            req.code = 204;
            req.location = "No Space available, Create Rack"
            next();
        }
        
    })
}

const createLocationObect = (bay, capacity) => {
    let selectedLocation;

    Object.entries(JSON.parse(bay.location)).some(([column, filledRows]) => { //this goes through all the columns, it breaks when it finds a column that is not full
        
        if (!(filledRows.length >= capacity * 2)) {
            selectedLocation = {
                'column': column,
                'filled': filledRows,//will use this to create row
                'level' : bay.level,
                'bay' : bay.bay_code,
            };
            return true; // Use 'some' to exit the loop once a suitable location is found
        }
        return false;
    });
    return selectedLocation;
}

const createLocationNo = (bayObj) => {
    const bay = String(bayObj.bay).padStart(3, '0');
    let row;
    if(bayObj.filled.length === 0){ // no need to generate if its empty, just provide one
        row = 1;
    }else{
        
        const availableSlot = Array.from({ length: 8 }, (_, index) => index + 1).find(num => !bayObj.filled.includes(String(num)));
        if (availableSlot !== undefined) {
            row = availableSlot;
        } else {
            console.log("Column is full"); //to DO go to next column
            return null;
        }

    }
    return `${bay}${bayObj.level}${bayObj.column}${row}`
}

const getBoxIndex = (req, res, next) => {
    getBoxNumber(req.body.client_code, (box)=>{
        req.data = {
            box_number : '',
            box_index : ''
        }
        if(box.length === 0){
            req.data.box_number = formatIndex(1,5);
        }else{
            req.data.box_number = formatIndex(parseInt(box[0].box_number)+1,5)
        }
        fetchBoxIndex((bIndex)=>{
            
            if(bIndex.length === 0){
                req.data.box_index = formatIndex(1,6);
            }else{
                req.data.box_index = formatIndex(parseInt(bIndex[0].id)+1,6)
            }
            next();
        });
        
    });
}

const createBox = (req, res, next) => {
    addBox(req.body, (result) => { //after adding box, update bay
        console.log(result)
        getBayByLevelBay({
            'bay_code' : String(parseInt(req.body.location.slice(0, 3))),
            'level' : req.body.location.charAt(3),
        },(bay)=>{
            let location = JSON.parse(bay.location);
            location[req.body.location.charAt(4)].push(req.body.location.charAt(5));
            console.log(location);
            console.log(req.body.location.charAt(4))
            console.log(req.body.location)
            updateBay({
                'bay_code' : String(parseInt(req.body.location.slice(0, 3))),
                'level' : req.body.location.charAt(3),
                'location' : JSON.stringify(location)
            }, (data) => {
                console.log(data)
                next();
            })
        });
        
        
    });
}

const updateBay = (data, callBack) => {
    updateBaySlot(data, (result) => {
        callBack(result)
    })
}


module.exports = {
    createRack,
    createRackLevel,
    getLocation,
    getBoxIndex,
    createBox,
    updateBay,
    getLastRackNo
}