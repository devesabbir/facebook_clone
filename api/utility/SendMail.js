import nodemail from 'nodemailer'

export const SendMail = async (to,sub,msg) => {
    
   try {
       let transporter = nodemail.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                user: "drivemovie721@gmail.com",
                pass: "kgivckhgtcpobieg"
                }
         })

        await transporter.sendMail(
            {
                from:'Instagram',
                to : to,
                subject: sub,
                text: msg
            }
        )


   } catch (error) {
       console.log(error);
   }
}