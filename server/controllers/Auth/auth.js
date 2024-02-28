const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jackdamian422@gmail.com',
        pass: 'qoqw qlfo ktyl evpb'
    }
});


exports.login = (req, res) => {
    const { email, password } = req.body;

    const secret = req.app.get('jwt-secret')
    const refreshSecret = req.app.get('jwt-refresh-secret')

    const findUserByEmail = () => {
        return User.findOne({ email: email.toLowerCase() })
    }
    const check = (user) => {
        if (!user) {
            throw new Error('email doesnt exist')
        } else {
            if (user.validPassword(password)) {
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            email: user.email,
                            role: user.role,
                            age: user.age,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                        secret,
                        {
                            expiresIn: '1h',
                        }, (err, token) => {
                            if (err) reject(err)

                            // Create a refresh token
                            const refreshToken = jwt.sign(
                                {
                                    _id: user._id,
                                    email: user.email,
                                },
                                refreshSecret,
                                {
                                    expiresIn: '1d',
                                }
                            );

                            resolve({ token, refreshToken, user })
                        })
                })
                return p;
            } else {
                throw new Error('login failed')
            }
        }
    }
    const respond = (userData) => {
        // res.cookie('token', userData.token, { httpOnly: true });
        res.cookie('token', userData.token);
        res.cookie('refreshToken', userData.refreshToken); // Sending the refresh token
        res.status(200).json(userData);
    }
    const onError = (error) => {
        console.log('error', error);
        res.status(400).json({ err: error });
    }

    findUserByEmail()
        .then(check)
        .then(respond)
        .catch(onError);
}


exports.register = (req, res) => {
    const userData = req.body;
    const secret = req.app.get('jwt-secret')
    const refreshSecret = req.app.get('jwt-refresh-secret')

    const findUserByEmail = () => {
        return User.findOne({ email: userData.email.toLowerCase() });
    }

    const createUser = (user) => {
        if (user) {
            throw new Error('email existe deja dans notre base de données');
        }
        return User.create(userData);
    }

    const createToken = (user) => {
        const p = new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                    age: user.age,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                secret,
                {
                    expiresIn: '1h',
                }, (err, token) => {
                    if (err) reject(err)

                    // Create a refresh token
                    const refreshToken = jwt.sign(
                        {
                            _id: user._id,
                            email: user.email,
                        },
                        refreshSecret,
                        {
                            expiresIn: '1d',
                        }
                    );

                    resolve({ token, refreshToken, user })
                })
        })
        return p;
    }

    const respond = (userData) => {
        res.cookie('token', userData.token);
        res.cookie('refreshToken', userData.refreshToken); // Sending the refresh token
        res.status(200).json(userData);
    }

    const onError = (error) => {
        console.log('error', error)
        res.status(404).json({ message: error });
    }

    findUserByEmail()
        .then(createUser)
        .then(createToken)
        .then(respond)
        .catch(onError);
}


exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const secret = req.app.get('jwt-secret');
    const refreshSecret = req.app.get('jwt-refresh-secret');

    if (!refreshToken) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(refreshToken, refreshSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        const accessToken = jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            secret,
            {
                expiresIn: '1h'
            });
            
        res.json({ accessToken });
    });
}



exports.sendEmail = (req, res) => {
    let mailOptions = {
        from: 'jackdamian422@gmail.com',
        to: req.body.email,
        subject: 'Get Your Password',
        html: '<p>You requested a password reset. Please click the link below to reset your password.</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
        }
    })
}
