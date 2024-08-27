import nodemailer from 'nodemailer';

 export async function sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail email address
          pass: process.env.GMAIL_PASS, // Your Gmail app password
        },
      });
      

  let info = await transporter.sendMail({
    from: `"KisoIndex " <${process.env.GMAIL_USER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  });

 
}
