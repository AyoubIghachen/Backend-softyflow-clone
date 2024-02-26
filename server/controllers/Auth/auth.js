const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const User = mongoose.model('User');


exports.login = (req, res) => {
    const { email, password } = req.body;

    const secret = req.app.get('jwt-secret')

    const findUserByEmail = () => {
        return User.findOne({ email: email.toLowerCase() })
    }
    const check = (user) => {
        if (!user) {
            throw new Error('email doesnt exist')// user does not exist
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
                            expiresIn: '1d',
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve({ token, user })
                        })
                })
                return p;
            } else {
                throw new Error('login failed')// user does not exist
            }
        }
    }
    const respond = (userData) => {
        // res.cookie('token', userData.token, { httpOnly: true });
        res.cookie('token', userData.token);
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
                    expiresIn: '1d',
                }, (err, token) => {
                    if (err) reject(err)
                    resolve({ token, user })
                })
        })
        return p;
    }

    const respond = (userData) => {
        res.cookie('token', userData.token, { httpOnly: true });
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
