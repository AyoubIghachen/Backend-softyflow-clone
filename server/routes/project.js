const ctrls = require('../controllers/projects/index.js');
const auth = require('../config/middlewares/authorizations.js');

module.exports = function (base, router) {

    router.route(base + '/projects')
        .get(auth.requiresLogin, ctrls.project.getProjects)
        .post(auth.requiresLogin, ctrls.project.createProject);

    router.route(base + '/projects/user')
        .get(auth.requiresLogin, ctrls.project.getUserProjects);

    router.route(base + '/projects/:projectId')
        .get(auth.requiresLogin, ctrls.project.getProject)
        .patch(auth.requiresLogin, ctrls.project.updateProject)
        .delete(auth.requiresLogin, ctrls.project.deletProject);

    router.route(base + '/projects/:projectId/user')
        .get(auth.requiresLogin, ctrls.project.getUserProject);

    router.route(base + '/projects/:projectId/interface')
        .post(auth.requiresLogin, ctrls.project.createInterface);

    router.route(base + '/projects/:projectId/interface/:interfaceId')
        .patch(auth.requiresLogin, ctrls.project.updateInterface);

    router.route(base + '/projects/:projectId/interface/:interfaceId/view')
        .get(auth.requiresLogin, ctrls.project.getSingleInterfaceRender);
};