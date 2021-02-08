declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: string;
			PORT: string;
			MONGODB_URI: string;
		}
	}
}

export {};
