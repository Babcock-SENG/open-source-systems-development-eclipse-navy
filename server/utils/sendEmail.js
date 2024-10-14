// setting up the transporter

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
//mailsending 


export const sendEmail = async (OTP, email, res) => {
    try {

        //mail options
        const mailOptions = {
            from: {
                name: "study group fimder",
                adderess: process.env.EMAIL
            },
            to: email,
            subject: "OTP VERIFICATION CODE ",
            html: `<p>Use this <b>${OTP}</b> as your otp</p> 
            <p>This code expires in 5mins </p>`,
        }


       transporter.sendMail(mailOptions)
    }
    catch (error) {
        console.error("Error occured : ", error)
    }
}