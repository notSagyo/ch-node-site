import { createTransport } from 'nodemailer';

export const TEST_MAIL = 'myrtle.langosh70@ethereal.email';

export const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: 'Sr54T5D6CH17DHe48r',
  },
});
