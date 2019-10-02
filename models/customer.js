const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	phone:{
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 15
	},
	isGold:{
		type: Boolean,
		required: true,
		default:true
	

	}
})
const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){

	const schema = {
		name: Joi.string().min(3).required(),
		phone: Joi.number().min(10).required(),
		isGold: Joi.boolean()
	}
	return Joi.validate(customer,schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;