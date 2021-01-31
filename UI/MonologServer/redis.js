const redis = require("redis");

class Redis {
    constructor(db) {
        this.client = redis.createClient();
        this.multi = this.client.multi();
        this.client.select(db, (err) => {
            if (err) throw err;
        });
    }

    updateRedis(key, value, isList) {
        if (!isList) {
            this.client.set(key, value, (err) => {
                if (err) throw err;
            })
        } else {
            for (let i = 0; i < value.length; i++) {
                let val = value[i];
                if (val[val.length - 1] == '/') {
                    value[i] = val.substring(0, val.length - 1);
                } this.multi.rpush(key, value[i]);
            } this.multi.exec((err) => {
                if (err) throw err;
            });
            this.client.set("dirCount", value.length - 1, (err) => {
                if (err) throw err;
            });
        }
    }

    getFromRedis(key) {
        this.client.get(key, (err, reply) => {
            if (err) throw err;
            return reply;
        });
    }
}

module.exports = Redis;