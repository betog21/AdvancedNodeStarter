const mongoose = require("mongoose");

const exect = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("I'm about to run a query");
  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);
  const key = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  });
  return exect.apply(this, arguments);
};
