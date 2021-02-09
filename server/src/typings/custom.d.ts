declare module 'express-session' {
	interface SessionData {
		context: {
			id: string;
		};
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			MONGODB_URI: string;
			REDIS_HOST: string;
			REDIS_PASSWORD: string;
			REDIS_PORT: string;
			SESSION_SECRET: string;
			JWT_SECRET: string;
		}
	}

	interface CookieOptions {
		sameSite: boolean | 'none' | 'strict' | 'lax' | undefined;
		secure: boolean;
		httpOnly: boolean;
		maxAge: number;
	}
}

export {};
