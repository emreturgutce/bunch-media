import mongoose from 'mongoose';
import { MONGODB_URI, PORT } from './config';
import { app } from './app';

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log(`🌱 Connected to mongodb`);
	})
	.catch((err) => {
		console.log(`❗ Error occurred connecting mongodb: ${err}`);
	});

app.listen(PORT, () => {
	console.log(`🛫 App is running on port ${PORT}`);
});
