//helper function for data cache
const Redis = require("ioredis");
const redis = new Redis({
  port: 13817,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});
module.exports = redis;
