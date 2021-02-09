import Redis, { Redis as RedisType } from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from '.';

export class RedisClient {
	private static client: RedisType;

	static getInstance(): RedisType {
		if (!RedisClient.client) {
			RedisClient.client = new Redis({
				host: REDIS_HOST,
				password: REDIS_PASSWORD,
				port: Number(REDIS_PORT),
			});

			RedisClient.client.on('error', (err) => {
				console.log(`❗ Error occurred connecting Redis: ${err}`);
			});

			RedisClient.client.once('connect', () => {
				console.log(`🔥 Connected to Redis`);
			});
		}

		return RedisClient.client;
	}
}
