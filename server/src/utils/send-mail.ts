import nodemailer from 'nodemailer';

export async function sendEmail(email: string, url: string) {
	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	const info = await transporter.sendMail({
		from: '"Bunch Media" <verify@bunchmedia.com>',
		to: email,
		subject: 'Bunch Media Email Confirmation',
		html: `
			<div>
				<h3>Confirmation URL</h3>
				<a href="${url}" target="_blank">${url}</a>
			</div>`,
	});

	console.info(`Message sent: ${info.messageId}
Preview URL:  ${nodemailer.getTestMessageUrl(info)}
	`);
}
