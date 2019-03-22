const services = require('../services');
const validation = require('../utils/validation');
const Error = require('../utils/error');
const db = require('../models');


//-------------------------------------------------------------|
//------- Auth Controllers ------------------------------------|
//-------------------------------------------------------------|
exports.login = async (req, res) => {
    let validate = validation.validateLogin(req.body);
    if(typeof validate != 'boolean') {
        let error = Error.argumentError(validate)
        error.sendError(res);
    } else {
        await services.login(req.body)
        .then(data => {
            res.json({
                status: 'Success',
                data: data
            });
        })
        .catch(err => {
            if(err.toJSON == null) {
                Error.internalError(err.message).sendError(res);
            } else {
                err.sendError(res);
            }
        });
    }
}

exports.signup = (req, res) => {
    let validate = validation.validateSignup(req.body);
    if(typeof validate != 'boolean') {
        let error = Error.argumentError(validate)
        error.sendError(res);
    } else {
        services.signup(req.body)
        .then(data => {
            res.json({
                status: 'Success',
                data: data
            });
        })
        .catch(err => {
            if(err.toJSON == null) {
                Error.internalError(err.message).sendError(res);
            } else {
                err.sendError(res);
            }
        });
    }
}

//-------------------------------------------------------------|
//------- Other Controllers -----------------------------------|
//-------------------------------------------------------------|
exports.home = (req, res) => {  
    if(!true) {
        services.home(req.body)
        .then(() => {
            res.json({
                success: true,
                data: "done"
            })
        })
    } else {
        res.json({
            success: true,
            data: "done"
        })
    }
}

exports.getOfficesNearLocation = (req, res) => {
    req.body = req.query;
    let validate = validation.validateLocation(req.body);
    if(typeof validate != 'boolean') {
        let error = Error.argumentError(validate)
        error.sendError(res);
    } else {
        services.getOfficesNearLocation(req.body)
        .then(data => {
            res.json({
                status: 'Success',
                data: data
            });
        })
        .catch(err => {
            if(err.toJSON == null) {
                Error.internalError(err.message).sendError(res);
            } else {
                err.sendError(res);
            }
        });
    }
}

exports.sendMail = (req, res) => {
    console.log(req.body);
    services.sendMail(req.body)
        .then(data => {
            res.json({
                status: 'Success',
                data: data
            });
        })
        .catch(err => {
            if(err.toJSON == null) {
                Error.internalError(err.message).sendError(res);
            } else {
                err.sendError(res);
            }
        });
}