const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongooseSchema = new Schema({
  user: {type: String, required: true, ref: 'user'},
  name: {type: String},
	data: {type: Schema.Types.Mixed}
},{timestamps: true});

module.exports = mongoose.model('product',mongooseSchema);
