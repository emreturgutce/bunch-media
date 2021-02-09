import { v4 as uuid } from 'uuid';
import { CONFIRM_USER_PREFIX } from '../constants';
import { RedisClient } from '../config';

export const createConfirmationUrl = async (
	userId: string,
): Promise<string> => {
	const token = uuid();

	await RedisClient.getInstance().set(
		`${CONFIRM_USER_PREFIX}${token}`,
		userId,
		'ex',
		60 * 15,
	);

	return `http://localhost:3000/user/confirm/${token}`;
};
