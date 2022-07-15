const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exect = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  console.log("I'm about to run a query");
  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  //see if we have a value for 'key' in redis
  const cacheValue = await client.get(key);

  //If we do, return that
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
      ? doc.map((document) => new this.model(document))
      : new this.model(doc);
  }

  //Otherwise, issue the query and store the
  //result in redis
  const result = await exect.apply(this, arguments);
  client.set(key, JSON.stringify(result));
  return result;
};
