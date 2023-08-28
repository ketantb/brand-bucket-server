const router = require('express').Router();
const User = require("../models/usersModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

function sendOtpMail(email, otp) {
    //send email of booking confirmation
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: "harshadaa1997@gmail.com", //process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "OTP verificaion for Brand Bucket",
        html: `
        <div>
        <h1 style="font-size:24px">Hello From Brand Bucket<h1>
        <p style="font-size:18px; margin-top:50px;">Verification Code 
        <span style="padding:25px; background-color:#5bf1ff4a; font-size:36px; font-weight:900">
        ${otp}
        </span>
        </p>
        <section style= "margin-top:50px">
        <img src = "https://www.brandbucket.com/images7/head_logo2s.png?" 
         style="margin-top:50px; padding: 25px; background-color:#ffff; width:150px; height:50px"/>
        </section>
        </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { error: error };
        } else {
            console.log("Email sent: " + info.response);
            return { success: true, message: info.response };
        }
    });

}

//ROUTE TO GENERATE OTP AND SEND IT TO USER NUMBER THROUGHT SMS
router.post('/registration', async (req, res) => {
    try {
        const { name, email, userType } = req.body
        const emailFoundButNotVerified = await User.findOne({ email, isVerified: false })
        if (emailFoundButNotVerified) {
            console.log("emailFoundButNotVerified => ", emailFoundButNotVerified)
            sendOtpMail(emailFoundButNotVerified.email, emailFoundButNotVerified.otp)
            return res.status(200).json({ success: false, message: 'user found but not verified' })
        }
        const emailFound = await User.findOne({ email })
        if (emailFound) {
            console.log(emailFound)
            return res.status(500).json({ success: false, message: 'email already in use' })
        }
        else {
            const otp = Math.floor(1000 + Math.random() * 9999).toString().substr(0, 4);
            let password = req.body.password
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            password = hashedPassword
            const userData = { name, email, password, otp: otp, userType }
            const user = await User.create(userData)
            sendOtpMail(email, otp)
            return res.status(200).json({ success: true })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})



// ROUTER TO VERIFY OTP
// WHEN YOU ENTER OTP AND SUBMIT
router.post('/verify-otp', async (req, resp) => {
    try {
        const email = req.body.email
        const otp = req.body.otp
        const user = await User.findOne({ email, otp });

        // console.log(user)
        if (user) {
            user.isVerified = true
            await user.save()
            console.log(user)
            resp.json({ sucess: true, message: 'Email verified successfully' })
        }
        else {
            resp.json({ success: false, message: 'Invalid OTP' })
        }
    }
    catch (err) {
        resp.json({ success: false, message: err })
    }
})



//SIGN-IN ROUTE 
router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email)
        const userData = await User.findOne({ email: email })
        console.log('userData => ', userData)
        if (!userData || email != userData.email) {
            console.log("Invalid Email or Password")
            return res.status(400).send("Invalid Email or Password")
        }
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {
                const token = jwt.sign({ _id: userData._id }, process.env.SECRET_KEY, { expiresIn: '24h' })

                res.status(200).send({
                    success: true,
                    message: 'Signin Successful',
                    token
                });
            }
            else {
                return res.status(400).send("Invalid Password")
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})

//GET DASHBOARD DETAILS
// router.get('/dashboard-details', adminMiddleware, async (req, res) => {
//     console.log("req.admin => ", req.admin)
//     try {
//         const userData = await User.findById({ _id: req.admin._id })
//         console.log(userData)
//         return res.status(200).json({ userData })
//     }
//     catch (err) {
//         console.log(err)
//         return res.status(400).json({ err: err })
//     }
// })


// router.put('/dashboard-details/:id', adminMiddleware, async (req, res) => {
//     try {
//         const { id } = req.params
//         const dashboardDetails = req.body
//         const dbUpdateUserData = await User.findByIdAndUpdate(
//             id, { companyDashboardDetails: dashboardDetails })
//         return res.status(200).json({ success: true, dbUpdateUserData })
//     }
//     catch (err) {
//         console.log(err)
//     }
// })

module.exports = router