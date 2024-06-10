const mongoose = require('mongoose');

module.exports = () => {
    const ConnectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB, ConnectionParams);
        console.log(`\nConnected to Database Successfully\n`)
    } catch (error) {
        console.log(error);
        console.log(`Error connecting to Database`);
    }
};