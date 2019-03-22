//all type of data validations must be placed here

module.exports.validateEmail = (email) => {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(emailPattern) == null ? false : true;
}

module.exports.validatePassword = (password) => {
    const oneUpperCase = /(?=.*[A-Z])/;
    const oneSpecialSymbol = /(?=.*[!@#$&*])/;
    const oneDigit = /(?=.*[0-9])/;
    const oneLowerCase = /(?=.*[a-z])/;
    const length = /.{6,20}$/;

    let errors = [];

    if(!password.match(oneUpperCase))
        errors.push("Password must contain at least one uppercase letter");

    if(!password.match(oneSpecialSymbol))
        errors.push("Password must contain at least one special symbol");

    if(!password.match(oneDigit))
        errors.push("Password must contain at least one digit");

    if(!password.match(oneLowerCase))
        errors.push("Password must contain at least one lowercase letter");

    if(!password.match(length))
        errors.push("Password length must be between 6 to 20 characters");

    if(errors.length > 0)
        return errors;

    return true;
}

module.exports.validateName = (name) => {
    const namePattern = /^[A-Z]+$/i;
    return name.match(namePattern) == null ? false : true;
}

module.exports.validateSignup = (body) => {
    let errors = [];

    if(!(body.firstName && body.lastName && body.email && body.password)) {
        return ['all fields are required and can not be null'];
    }

    if(this.validateName(body.firstName) == null) {
        errors.push('firstName is not valid');
    }

    if(this.validateName(body.lastName) == null) {
        errors.push('lastName is not valid');
    }

    if(this.validateEmail(body.email) == null) {
        errors.push('Email is not valid');
    }

    let passwordErrors = this.validatePassword(body.password);

    if(typeof passwordErrors != 'boolean') {
        errors = [...errors, ...passwordErrors];
    }

    if(errors.length > 0)
        return errors;
    return true;
}

module.exports.validateLogin = (body) => {
    let errors = [];

    if(!(body.email && body.password)) {
        return ['all fields are required and can not be null'];
    }

    if(this.validateEmail(body.email) == null) {
        errors.push('Email is not valid');
    }

    let passwordErrors = this.validatePassword(body.password);

    if(typeof passwordErrors != 'boolean') {
        errors = [...errors, ...passwordErrors];
    }

    if(errors.length > 0)
        return errors;
    return true;
}

exports.validateLocation = (body) => {
    let locationPattern = /^[-0-9.,]+$/;
    let distancePattern = /^[0-9.]+$/;
    let errors = [];

    if(!(body.location && body.distance)) {
        return ['all fields are required and can not be null'];
    }

    if(body.location.match(locationPattern) == null) {
        errors.push("Location is not valid");
    }

    if(body.distance.match(distancePattern) == null) {
        errors.push("Distance is not valid");
    }

    if(errors.length > 0)
        return errors;
    return true;
}