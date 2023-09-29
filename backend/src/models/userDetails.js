const mongoose=require('mongoose');

let Registeruser=new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    password: { type: String,   required: function () {
        // Only require password if it exists (e.g., for registration)
        return this.password || this.confirmpassword;
      },},
    confirmpassword: { type: String,  required: function () {
        // Only require password if it exists (e.g., for registration)
        return this.password || this.confirmpassword;
      },}
})

module.exports=mongoose.model("Registeruser",Registeruser)