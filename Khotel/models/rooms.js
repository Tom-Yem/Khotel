const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    room_number: Number,
    price: Number,
    specials: String,
    reserved:[
        {
            from: String,
            to: String
        }
    ],
    kind: String
});

const Rooms = mongoose.model( 'rooms', roomsSchema);

async function createRoom(num,kind,specials,price){
    const r = await Rooms.find({room_number:num});
    if(r.length != 0) throw Error('Value already exist!')
      const rooms = new Rooms({
         room_number:num,
         kind,
         specials,
         price
      });
      const result = await rooms.save();
      return result;
    
};

async function getRooms(check_in,check_out,kind){
    const rooms = await Rooms.find({
        kind,
        reserved:{
            $not: {
                $elemMatch: { from: {$lt: check_out},to: {$gt: check_in}}}
            }
        });
    return rooms;
}

async function reserveRoom(num,from,to){
    const result = await Rooms.updateOne({ room_number: num},{
       $push: {
           reserved: { from,to}
       } 
    });
    return result;
    
}

async function reservedRooms(from,to){
    const rooms = await Rooms.find({
        reserved:{
            $elemMatch: { from: {$lt: to},to: {$gt: from}}
        } 
    }).select('room_number kind -_id');
    return rooms;
};

async function allRooms(){
    const rooms = await Rooms.find().select('-reserved');
    return rooms;
};

async function updateRoom(num,kind,specials,price){
    const result = await Rooms.updateOne({ room_number:num},{
        $set: {
           kind,
           specials,
           price
        }
    })
    return result; 
};

async function deleteRoom(num){
    const result = await Rooms.deleteOne({ room_number:num});
    return result;
}; 

async function unreserveRoom(num,from,to){
    let result = await Rooms.updateOne({room_number:num},{
        $pull: {
            reserved: { from:{ $lt:to},to:{ $gt:from}}
        }
    })
    return result;
}

module.exports.createRoom = createRoom;
module.exports.getRooms = getRooms;
module.exports.reserveRoom = reserveRoom;
module.exports.allRooms = allRooms;
module.exports.updateRoom = updateRoom;
module.exports.deleteRoom = deleteRoom;
module.exports.reservedRooms = reservedRooms;
module.exports.unreserveRoom = unreserveRoom;
