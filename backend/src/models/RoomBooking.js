const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
  
  hotelName:{type:String,required:true},
  hotelCity:{type:String,required:true},
  roomName:{type:String,required:true},
  roomPrice:{type:Number,required:true},
  checkInDate: { type: Date, required: true },
  checkOutDate:{ type: Date, required: true },
  firstName:{type:String,required:true},
  lastName:{type:String,required:true},
  email:{type:String,required:true},
  phone: {type:String,required:true},
  address: {type:String,required:true},
  nationality: {type:String,required:true},
  currentCountry: {type:String,required:true},
  travelers: [
    {
      salutation: {type:String,required:true},
      travelerFirstName: {type:String,required:true},
      travelerLastName: {type:String,required:true},
    },
  ],
 
  paymentOption: {type:String,required:true},
  termsAndConditions: {type:Boolean,required:true}
});
module.exports = mongoose.model('RoomBooking', roomBookingSchema);
