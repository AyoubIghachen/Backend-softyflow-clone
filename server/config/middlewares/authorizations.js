const jwt = require('jsonwebtoken')


exports.requiresLogin = function (req, res, next) {
    const token = req.cookies['token']
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'not logged in'
        })
    }
  
    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )
  
    const onError = (error) => {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
    p.then((decoded)=>{
        console.log('decoded',decoded)
        req.decoded = decoded
        next()
    }).catch(onError)
  };