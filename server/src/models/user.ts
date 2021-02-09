import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { JSONSchemaType } from 'ajv';

export const userSchema: JSONSchemaType<IUserAttributes> = {
	type: 'object',
	properties: {
		email: { type: 'string', minLength: 0, maxLength: 255 },
		password: { type: 'string', minLength: 0, maxLength: 255 },
		phone: { type: 'string', minLength: 0, maxLength: 15 },
		biography: { type: 'string' },
	},
	required: ['email', 'password'],
	additionalProperties: false,
};

interface IUserDocument extends mongoose.Document {
	email: string;
	password: string;
	biography: string;
	phone: string;
}

export interface IUserAttributes {
	email: IUserDocument['email'];
	password: IUserDocument['password'];
	biography: IUserDocument['biography'];
	phone: IUserDocument['phone'];
}

interface IUserModel extends mongoose.Model<IUserDocument> {
	build(attributes: IUserAttributes): IUserDocument;
	findByEmailAndPassword(
		email: string,
		password: string,
	): Promise<IUserDocument | null>;
}

const userRoles = ['USER', 'ADMIN'];
const platforms = ['YOUTUBE', 'TWITTER'];

const schema = new mongoose.Schema<IUserDocument, IUserModel>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		biography: {
			type: String,
			required: false,
		},
		phone: {
			type: String,
			required: false,
		},
		verified: {
			type: Boolean,
			default: false,
			required: true,
		},
		role: {
			type: String,
			default: 'USER',
			enum: userRoles,
			required: true,
		},
		platforms: [
			{
				type: String,
				enum: platforms,
			},
		],
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	},
).pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashedPassword = await bcrypt.hash(this.get('password'), 10);

		this.set('password', hashedPassword);
	}

	done();
});

schema.statics.build = (attributes: IUserAttributes) => new User(attributes);
schema.statics.findByEmailAndPassword = async (
	email: string,
	password: string,
) => {
	const user = await User.findOne({
		email,
	});

	if (user && (await bcrypt.compare(password, user.password))) {
		return user;
	}

	return null;
};

const User = mongoose.model<IUserDocument, IUserModel>('User', schema);

export { User };
