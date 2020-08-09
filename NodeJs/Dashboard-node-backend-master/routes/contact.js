const email_verifier = require("email-verifier-node");
var nodemailer = require("nodemailer");
const { Router } = require("express");

const contactRouter = Router();


var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "doukan.ITI40@gmail.com",
      pass: "01551326547H97"
    }
  });



contactRouter.post("/", async (req, res, next) => {
    const { email , subject , body } = req.body;
    try{
        email_verifier.verify_email(email).then(result => {
            if (result.message === "Email Verified") {
        
                var mailOptions = {
                  to: "doukan.ITI40@gmail.com",
                  from: email,
                  subject: subject,
                  html:`<h2>from: ${email}</h2><br/> ${body}`
                }
                transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });
                res.json({message:"Your feedback sent Successfully"})
  
            }else{
             res.json({message:"please pass valid email"})

            }
           
        })
    }catch(err){
        res.json({message:"please pass valid email"})
    }
   })
     
   module.exports=contactRouter