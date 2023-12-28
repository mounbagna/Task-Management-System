const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	priority: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		default: Date.now()
	},
	dueDate: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	}
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;