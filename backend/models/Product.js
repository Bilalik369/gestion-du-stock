const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title : {type :String , require : true  },
    description : { type : String , require : true },
    price : { type : Number , require : true , min :0},
    stock : { type : Number , require : true , min :0},
    image :{ type : String , require : true},


});

module.exports = mongoose.model("Product" , productSchema);