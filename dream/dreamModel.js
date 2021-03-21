const mongoose = require('mongoose');

 const DreamType = Object.freeze({
 happy :  'happy',
 sad : 'sad',
 exciting : 'exciting',
 scary : 'scary'

});
const dreamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {type : String, require : true},
  description: {type : String, require : true},
  date: {type : Date ,require :true},
  type: {type : String , enum : DreamType, require : true},
},
{
  versionKey: false
}
);

Object.assign(dreamSchema.statics, {
  DreamType,
});
module.exports.DreamType;

module.exports = mongoose.model('Dream', dreamSchema,'Dream');
