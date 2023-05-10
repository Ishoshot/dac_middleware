const { createClient } = require('redis');

const REDIS_ENV = process.env.REDIS_ENV;

let client;
if (REDIS_ENV === 'production') {
    client = createClient({
        password: 'w76w7loQRKg0U6D02AZF0ZPHbUTp6jVL',
        socket: {
            host: 'redis-11085.c8.us-east-1-2.ec2.cloud.redislabs.com',
            port: 11085
        }
    });
} else {
    client = createClient();
}


client.on('error', err => console.log('Redis Client Error', err));
client.connect();

async function saveInMemory(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    return await client.set(key, value);
}

async function getFromMemory(key) {
    const value = await client.get(key);
    if (value === null) {
        return null;
    }
    if (value[0] === '{') {
        return JSON.parse(value);
    }
    return value;
}

async function deleteFromMemory(key) {
    return await client.del(key);
}


module.exports = { saveInMemory, getFromMemory, deleteFromMemory };
