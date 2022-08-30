import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
export const twilioNumber = '+12139960300';

export const client = twilio(accountSid, authToken);
