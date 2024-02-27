const ctrls = require('../controllers/interfaces/index.js');
const auth = require('../config/middlewares/authorizations.js');

module.exports = function (router) {

    router.route('/get-interfaces')
        .get(auth.requiresLogin, ctrls.interface.getInterfaces);

    router.route('/create-interface')
        .post(auth.requiresLogin, ctrls.interface.createInterface);

    router.route('/interface/:interfaceId')
        .get(auth.requiresLogin, ctrls.interface.getSingleInterface)
        .patch(auth.requiresLogin, ctrls.interface.updateInterface)
        .delete(auth.requiresLogin, ctrls.interface.deleteInterface)

    router.route('/interface/:interfaceId/view')
        .get(auth.requiresLogin, ctrls.interface.getSingleInterfaceRender, (req, res) => {
            res.render('interface', { interface: req.interface.toObject() });
        });

}
