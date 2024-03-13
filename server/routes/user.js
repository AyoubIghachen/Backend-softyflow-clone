const ctrls = require('../controllers/users/index.js');
const auth = require('../config/middlewares/authorizations');


module.exports = function (base, router) {

        router.route(base + '/user')
                .get(auth.requiresLogin, ctrls.user.getUsers);

        router.route(base + '/user/:userId')
                .get(auth.requiresLogin, ctrls.user.getSingleUser)
                .patch(auth.requiresLogin, ctrls.user.updateUser)
                .delete(auth.requiresLogin, ctrls.user.deleteUser)
}
