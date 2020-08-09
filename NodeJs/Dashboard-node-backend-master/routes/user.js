const { Router } = require("express");
const bcrypt = require("bcrypt");
const email_verifier = require("email-verifier-node");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authentication");
const tokenHelpers = require("../helpers/token");
var nodemailer = require("nodemailer");
//const sendgridTransport = require("nodemailer-sendgrid-transport");




var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "doukan.ITI40@gmail.com",
    pass: "01551326547H97"
  }
});

//const Verifier = require("email-verifier");
const userRouter = Router();

userRouter.post("/register", async (req, res, next) => {
  msg = "this email is already exist"
  DOB = ""
  try {
    const data = req.body;
   
    if(data.DOB){
      const day = data.DOB.day
      const month = data.DOB.month
      const year = data.DOB.year
      DOB = day + "/" + month + "/" + year
    }else{
      DOB = null
    }
   
    //console.log(day)
    console.log(data);
    const { password, email, Type } = req.body;
    const currentUser = await User.findAll({
      where: { email: email }
    });

    console.log(`curr ${currentUser}`);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    data.password = hashedPassword;
    data.DOB = DOB
    email_verifier.verify_email(email).then(result => {
      console.log(result);
      if (result.message === "Email Verified") {
        if (!currentUser[0]) {
          User.create(data).then(newUser => {
            res.json({user:newUser});
          });
          var mailOptions = {
            to: email,
            from: "doukan.ITI40@gmail.com",
            subject: "SignUp Succeeded",
            html: "<h1>You Successfully Signed UP</h1>"
          };
          if(Type == "shop")
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

        } else {
          console.log(msg)
          res.json({ message: msg });
        }
      } else {
        res.json({message:'Please pass valid email address'});
      }
    });
   

    // console.log(password)
  } catch (err) {
    console.error(err);
    res.json({message:err});
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const error =  "invalid email or password"
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const currentUser = await User.findAll({
      where: { email: email }
    });
    // console.log(currentUser[0].dataValues.password)
    if(currentUser[0]){
      const isMatch = await bcrypt.compare(
        password,
        currentUser[0].dataValues.password
      );
      console.log(isMatch);
      if (isMatch) {
        const token = await tokenHelpers.sign(currentUser[0].dataValues.id);
        console.log(currentUser[0].dataValues.Type )
        res.json({ token: token, Type: currentUser[0].dataValues.Type , id: currentUser[0].dataValues.id ,fName:currentUser[0].dataValues.fName,status:currentUser[0].dataValues.status});
      } else {
        console.log(error)
        res.json({ error:"Invalid Email or password" });
      }
    }else{
      res.json({error:"Invalid Email or password"})
    }
   
  
  } catch (err) {
    //console.error(err);
    res.json({ error: err });
  }
});
/////////////////////////////////////
userRouter.post("/admin/login", async (req, res, next) => {
  try {
    const error =  "invalid email or password"
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const currentUser = await User.findAll({
      where: { email: email }
    });
    // console.log(currentUser[0].dataValues.password)
    if(currentUser[0] && currentUser[0].dataValues.Type == "admin"){
      const isMatch = await bcrypt.compare(
        password,
        currentUser[0].dataValues.password
      );
      console.log(isMatch);
      if (isMatch) {
        const token = await tokenHelpers.sign(currentUser[0].dataValues.id);
        console.log(currentUser[0].dataValues.Type )
        res.json({ token: token, Type: currentUser[0].dataValues.Type , id: currentUser[0].dataValues.id ,fName:currentUser[0].dataValues.fName});
      } else {
        console.log(error)
        res.json({ error:"Invalid Email or password" });
      }
    }else{
      res.json({error:"Invalid Email or password"})
    }
   
  
  } catch (err) {
    //console.error(err);
    res.json({ error: err });
  }
});


//////////////////////////////////////
userRouter.get("/", (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//userRouter.use(authMiddleware)

userRouter.get("/profile", authMiddleware, async (req, res, next) => {
  res.status(200).json(req.currentUser);
});

userRouter.patch(
  "/profile/update/:id",
  authMiddleware,
  async (req, res, next) => {
    const updates = req.body;
    const { password } = updates;
    const { id } = req.params;
    console.log(req.body)
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      updates.password = hashedPassword;
      const response = await User.update(
        {
          fName: updates.fName,
          lName: updates.lName,
          email: updates.email,
          password: updates.password,
          phone: updates.phone,
          address:updates.address
        },
        {
          where: {
            id: id
          }
        }
      );
      console.log(response[0]);
      if (response[0] != 0)
        res.json({ message: "user updated", updates });
      else res.json({ message: "user not found" });
    } catch (err) {
      console.log("kkkkkkkkkk")
      res.json({ message: "Error.." });
    }
  }
);


/////////////////////Status Update Route
userRouter.patch(
  "/status/update/:id",
  authMiddleware,
  async (req, res, next) => {
    const updates = req.body;
    const { id } = req.params;
    try {
      const response = await User.update(
        {
          status: updates.status
        },
        {
          where: {
            id: id
          }
        }
      );
      console.log(response[0]);
      if (response[0] != 0)
        res.status(200).json({ message: "user status updated", updates });
      else res.status(404).json({ message: "user not found" });
    } catch (err) {
      res.status(404).json({ message: "Error.." });
    }
  }
);
////////////////////////Forgot password
userRouter.patch(
  "/forgotpass/:id",
  authMiddleware,
  async (req, res, next) => {
    const { email} = req.body;
    console.log(email);
    const currentUser = await User.findAll({
      where: { email: email }
    });
    if(currentUser[0]){
      var mailOptions = {
        to: email,
        from: "doukan.ITI40@gmail.com",
        subject: "Your Password is",
        html: "<h1>password</h1>"
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    const { id } = req.params;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
      updates.password = hashedPassword;
    try {
      const response = await User.update(
        {
          password: updates.password
        },
        {
          where: {
            id: id
          }
        }
      );
      console.log(response[0]);
      if (response[0] != 0)
        res.status(200).json({ message: "password updated", updates });
      else res.status(404).json({ message: "user not found" });
    } catch (err) {
      res.status(404).json({ message: "Error.." });
    }
  }
);

//////////////////////////////////////////////////


userRouter.delete("/profile/delete/:id",authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await User.destroy({
      where: {
        id: id
      }
    });
    console.log(response);
    if (response != 0) res.status(200).json({ message: "user deleted" });
    else res.status(404).json({ message: "user not found" });
  } catch (err) {
    res.status(404).json({ message: "error.." });
  }
});

module.exports = userRouter;
