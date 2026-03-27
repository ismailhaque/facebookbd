import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer"
import { accountActivation } from "./mailTemplate.js";

// Send an email using 
const sendEmail = expressAsyncHandler(async (to, sub, data) => {

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASS,
        }
    });

    await transporter.sendMail({
        from: '"Facebook" <ismailhaque2956@gmail.com>',
        to: to,
        subject: sub,
        html: data, // HTML version of the message
    })})

export default sendEmail