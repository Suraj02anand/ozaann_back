require("dotenv").config();
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")
const nodemailer = require("nodemailer")

const app = express()

// Middlewares
app.use(cors({
    allowedHeaders:"*",
    origin:"*"
}))
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
   
    const {name , phone , email , message , category } = req.body;
	

    const mailOptions = {
        from: 'ozaannhealthcare01@gmail.com', // sender address
        to: 'ozaann@rediffmail.com, mukthar.ceo@gmail.com', // list of receivers 
        subject: "You've received a response", // Subject line
        html: `
                <p>Name : ${name},</p>
                <p>Phone : ${phone},</p>
                <p>Email : ${email},</p>
                <p>Category : ${category},</p>
                <p>Message : ${message}</p>
            `
        // plain text body
    };

    // res.status(200).json({"status" : true});
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