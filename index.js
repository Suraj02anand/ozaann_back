require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")
const nodemailer = require("nodemailer")

const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser())
app.use(express.json())

// Node mailer setup

// Routes
app.get("/" , ( req , res ) => {
    console.log('/ route');
    res.send("ozaann health backend");
});

app.post("/sendmail" , (req,res) => {

    console.log('Sending mail...')
    console.log(req.body)
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ozaannhealthcare01@gmail.com',
            pass: process.env.mailing_password
        }
    })
   
    const {name , phone , email , message } = req.body;

    const mailOptions = {
        from: 'ozaannhealthcare01@gmail.com', // sender address
        to: 'suraj02manoj@gmail.com, jayagma032@gmail.com', // list of receivers 
        subject: "You've received a response", // Subject line
        html: `
                Name : ${name},
                Phone : ${phone},
                Email : ${email},
                Message : ${message}
        `
        // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err);
            res.status(403).json({"status" : false});
        }
        else{
            console.log(info);
            res.status(200).json({"status" : true});
        }
     });
    // res.send(req.body)
});


// PORT LISTENING
app.listen(process.env.PORT || 8000 , () => {
    console.log('Server is Up & Running');
})