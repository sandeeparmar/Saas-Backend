const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Successfully connected with Redis database");
});

redis.on("error", (err) => {
  console.error("Error occurred with Redis connection:", err);
});

module.exports = redis;
