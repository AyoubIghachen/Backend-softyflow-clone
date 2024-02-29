const ctrls = require('../controllers/users/index.js');
const auth = require('../config/middlewares/authorizations');

// change the name of the route to /user

module.exports = function (router) {

        // router.route('/user')
        //         .get(auth.requiresLogin, ctrls.user.getUsers);

        router.route('/get-users')
                .get(auth.requiresLogin, ctrls.user.getUsers);

        router.route('/user/:userId')
                .get(auth.requiresLogin, ctrls.user.getSingleUser)
                .patch(auth.requiresLogin, ctrls.user.updateUser)
                .delete(auth.requiresLogin, ctrls.user.deleteUser)
}
