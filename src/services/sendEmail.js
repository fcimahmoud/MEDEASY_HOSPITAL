const nodemailer = require("nodemailer");


async function sendEmail ({to, subject, message, attachments = [] } = {}) { 
    // configuration
    const transporter = nodemailer.createTransport({
        host: 'localhost',  // stmp.gmail.com
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            // credentials
            user: 'mahmoudcs112@gmail.com',
            pass: 'xaagdwpagsmpaglk'
        },
        // tls:{
        //     rejectUnauthorized: false
        // }
    })

    const emailInfo = await transporter.sendMail({
        from: '"MEDEASY Hospital" <mahmoudcs112@gmail.com>',
        to: to ? to : 'mahmoudcs112@gmail.com',
        subject: subject ? subject : '',
        html: message ? message : '',
        attachments
    })

    // console.log(emailInfo);
    if (emailInfo.accepted.length) { 
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    sendEmail,
}