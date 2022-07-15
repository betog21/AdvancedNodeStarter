const mongoose = require('mongoose')

const exect = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function (){
    console.log("I'm about to run a query");
    return exect.apply(this, arguments)
}
