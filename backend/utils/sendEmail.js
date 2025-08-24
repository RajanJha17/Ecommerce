import nodemailer from "nodemailer";

export const sendEmail=(options)=>{
    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });

    transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});


    const mailOptions={
        from:process.env.SMTP_FROM,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error("Error sending email:",error);
        }else{
            console.log("Email sent:",info.response);
        }
    });
}
