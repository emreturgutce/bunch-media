import session from 'express-session';
import connectRedis from 'connect-redis';
import { NODE_ENV, RedisClient, SESSION_SECRET } from '.';
import { COOKIE_EXPIRATION, COOKIE_NAME } from '../constants';

const RedisStore = connectRedis(session);

const isProd = NODE_ENV === 'production';

export const cookieOptions: CookieOptions = {
	sameSite: isProd ? 'none' : 'strict',
	secure: isProd,
	httpOnly: true,
	maxAge: COOKIE_EXPIRATION,
};

function sessionConfig() {
	return session({
		store: new RedisStore({
			client: RedisClient.getInstance(),
			prefix: 'session:',
		}),
		name: COOKIE_NAME,
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: cookieOptions,
	});
}

export { sessionConfig as session };
