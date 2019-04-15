const controllers = require('../controllers');

module.exports = function(app) {

    //auth routes
    app.post('/auth/login', controllers.login);
    app.post('/auth/signup', controllers.signup);
    app.post('/auth/forgotPassword', controllers.home);
    app.post('/auth/resetPassword', controllers.home);

    //other routes
    app.get('/officeNearLocation', controllers.getOfficesNearLocation);
    app.post('/sendMail', controllers.sendMail);
    app.get('/office', controllers.home);
    app.post('/office', controllers.home);
    app.put('/office', controllers.home);
    app.delete('/office', controllers.home);

    app.get('/aiq', controllers.getAiqNearLocation);
}