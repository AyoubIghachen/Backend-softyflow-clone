const ctrls = require('../controllers/Auth/index.js');


module.exports = function (router) {

        router.route('/login')
                .post(ctrls.auth.login);

        router.route('/register')
                .post(ctrls.auth.register);

        router.route('/logout')
                .get((req, res) => {
                        res.clearCookie('token');
                        res.json({ success: true });
                });

        router.route('/refresh-token')
                .post(ctrls.auth.refreshToken);

        router.route('/send-email')
                .post(ctrls.auth.sendEmail);

}
