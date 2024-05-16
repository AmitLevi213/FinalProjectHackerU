const config = require("config");
const ENVIRONMENT = config.get("NODE_ENV");

async function connectToDb() {
  if (ENVIRONMENT === "development") {
    const connect = require("./mongodb/connectToMongoDBLocally");
    const v = await connect();
    return v;
  }

  if (ENVIRONMENT === "production") {
    const connect = require("./mongodb/connectToAtlas");
    const v = await connect();
    return v;
  }
}

module.exports = connectToDb;
