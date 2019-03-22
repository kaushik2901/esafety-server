const nodemailer = require("nodemailer");
const db = require('../models');
const Error = require('../utils/error');

let transporter;
let init = async () => {
    // create reusable transporter object using the default SMTP transport
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "rnbdepartment@gmail.com", // generated ethereal user
            pass: "rnb@gujarat@gandhinagar" // generated ethereal password
        }
    });
}

init();

//----------------------------------------------------------------|
//---- Auth Services ---------------------------------------------|
//----------------------------------------------------------------|
exports.login = (body) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({ email: body.email });
        
        if(user) {
            let isValidPassword = user.verifyPassword(body.password);
            if(isValidPassword) {
                let { _id, email, firstName, lastName } = user;
                resolve({
                    _id,
                    firstName,
                    lastName,
                    email,
                    token: user.getToken()
                });
            } else {
                reject(Error.argumentError("Incorrect Password"));
            }
        } else {
            reject(Error.DBError("User not found"));
        }
    });
}

exports.signup = (body) => {
    return new Promise(async (resolve, reject) => {
        if(await db.User.findOne({ email: body.email })) {
            reject(Error.argumentError("Email already exists"));
        }

        let user = new db.User(body);
        user.setPassword(body.password);
        user.save()
            .then(() => {
                let { _id, email, firstName, lastName } = user;
                resolve({ _id, firstName, lastName, email });
            })
            .catch(err => reject(Error.DBError(err.message)));
    });
}

//----------------------------------------------------------------|
//---- Other Services --------------------------------------------|
//----------------------------------------------------------------|
exports.home = (body) => {
    return new Promise((resolve, reject) => {
        return resolve();
        let data = [
            {
                Name: "Upanishad Foundation",
                photo: "https://picsum.photos/300/300/?random",
                address: "Shop-22, F-block,Titanium City Center, Shyamal cross road",
                description: "Charity",
                contactNo: "-1",
                location: {
                    type: "Point",
                    coordinates: [72.525283,23.0096825]
                }
            },
            {
                Name: "Somchand Dosabhai Charitable Trust",
                photo: "https://picsum.photos/300/300/?random",
                address: "G-1 Mangaldeep Apartment, Opp. Pruthvi Tower, Jodhpur Gam Rd, Satellite, Ahmedabad, Gujarat 380015",
                description: "NGO",
                contactNo: "07940303095",
                location: {
                    type: "Point",
                    coordinates: [72.5195898,23.0216834]
                }
            },
            {
                Name: "JANPATH NETWORK",
                photo: "https://picsum.photos/300/300/?random",
                address: "Jivraj Cross Road, Jagadamba Soceity, Jivraj Park, Ahmedabad, Gujarat 380051",
                description: "Non Government Organization",
                contactNo: "07926821553",
                location: {
                    type: "Point",
                    coordinates: [72.5272797,23.0085224]
                }
            },
            {
                Name: "Apollo Pharmacy",
                photo: "https://picsum.photos/300/300/?random",
                address: "Shop No 16, Aaron Elegance, New CG Rd, Nigam Nagar, Chandkheda, Ahmedabad, Gujarat 382424",
                description: "Pharmaceutical company",
                contactNo: "07600041631",
                location: {
                    type: "Point",
                    coordinates: [72.5927247,23.1069404]
                }
            },
            {
                Name: "A2Z Dental Solutions",
                photo: "https://picsum.photos/300/300/?random",
                address: "Aaron Elegance, Opp.Radhe Bungalows ,New CG Road, Nigam Nagar, Chandkheda, Ahmedabad, Gujarat 382424",
                description: "Hospital",
                contactNo: "07940066103",
                location: {
                    type: "Point",
                    coordinates: [72.5957903,23.1079946]
                }
            }
        ];

        let promises = [];
    
        for(let i = 0; i < data.length; i++) {
            let officer = new db.Office(data[i]);
            promises.push(officer.save().then(() => console.log("done : ", i)));
        }

        Promise.all(promises)
        .then(() => {
            resolve();
        })
        .catch(err => reject(Error.DBError(err.message)));
    })
}

exports.getOfficesNearLocation = (body) => {
    return new Promise(async (resolve, reject) => {

        let location = body.location;
        let [ lat, lon ] = location.split(',');
        [ lat, lon ] = [ parseFloat(lat), parseFloat(lon) ];

        db.Office.aggregate([
            {
                "$geoNear": {
                        "near": {
                                "type": "Point",
                                "coordinates": [ lon, lat ]
                        },
                        "spherical": true,
                        "distanceField": "distance",
                        "maxDistance": parseFloat(body.distance)
                }
            }
        ]).then(data => {
            resolve(data);
        })
        .catch(err => reject(Error.DBError(err.message)));
    });
}

exports.sendMail = (body) => {
    return new Promise(async (resolve, reject) => {
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"E-Safety" <emergency@esafety.com>', // sender address
            to: "kaushikjadav602@gmail.com, b.jay2040@gmail.com, sagarbhoi188@gmail.com, vkjchavda61198@gmail.com", // list of receivers
            subject: "Emergency Service needed", // Subject line
            html: `Respected Officer,<br /><br />Emergency help needed at location ${body.location}.<br />Message : ${body.message}<br />Direction : https://www.google.com/maps/dir/?api=1&destination=${body.location}` // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        resolve(info);

    });
}