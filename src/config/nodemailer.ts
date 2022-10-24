import { createTransport } from 'nodemailer';

export const TEST_MAIL = 'alfonzo.nolan22@ethereal.email';

export const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: 'XsRdE7mF5cd3sBbMES',
  },
});
