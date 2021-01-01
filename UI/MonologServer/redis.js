const redis = require("redis");

class Redis {
    constructor(db) {
        this.client = redis.createClient();
        this.client.select(db, (err) => {
            if (err) throw err;
        });
    }

    updateRedis(key, value) {
        this.client.set(key, value, (err) => {
            if (err) throw err;
        })
    }

    getFromRedis(key) {
        this.client.get(key, (err, reply) => {
            if (err) throw err;
            return reply;
        });
    }
}

module.exports = Redis;