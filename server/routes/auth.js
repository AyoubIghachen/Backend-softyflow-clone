const ctrls = require('../controllers/Auth/index.js');


module.exports = function (base ,router) {

        router.route(base + '/login')
                .post(ctrls.auth.login);

        router.route(base + '/register')
                .post(ctrls.auth.register);

        router.route(base + '/logout')
                .get(ctrls.auth.logout);

        router.route(base + '/refresh-token')
                .post(ctrls.auth.refreshToken);

        router.route(base + '/send-email')
                .post(ctrls.auth.sendEmail);

}
