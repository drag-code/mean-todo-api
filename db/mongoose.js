const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => console.log("CONNECTED"))
	.catch((err) => console.log(err));

module.exports = mongoose;