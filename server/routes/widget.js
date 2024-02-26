const ctrls = require('../controllers/widgets/index.js');
const auth = require('../config/middlewares/authorizations');

module.exports = function (router) {

    router.route('/get-widgets')
        .get(auth.requiresLogin, ctrls.widget.getWidgets);

        router.route('/create-widget')
        .post(auth.requiresLogin, ctrls.widget.createWidget);

    router.route('/widget/:widgetId')
        .get(auth.requiresLogin, ctrls.widget.getSingleWidget)
        .patch(auth.requiresLogin, ctrls.widget.updateWidget)
        .delete(auth.requiresLogin, ctrls.widget.deleteWidget)
}
