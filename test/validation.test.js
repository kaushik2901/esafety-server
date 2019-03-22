var expect = require('chai').expect;
var validation = require('../utils/validation');

describe('Testing validation.js', function() {
    describe('validateEmail()', function () {
        it('should return true', function () {
            let email = "kaushikjadav602@gmail.com";
            let res = validation.validateEmail(email);
            expect(res).to.be.equal(true);
        });
    
        it('should return false', function () {
            let email = "kaushikjadav602_gmail.com";
            let res = validation.validateEmail(email);
            expect(res).to.be.equal(false);
        });
    });
    
    describe('validatePassword()', function () {
        it('should return array of length 3', function () {
            let password = "kaushik";
            let res = validation.validatePassword(password);
            expect(res).to.have.length(3);
        });
      
        it('should return true', function () {
            let password = "Kaushikjadav602@gmail.com";
            let res = validation.validatePassword(password);
            expect(res).to.be.equal(true);
        });
    });
    
    describe('validateName()', function () {
        it('should return true', function () {
            let name = "kaushik";
            let res = validation.validateName(name);
            expect(res).to.be.equal(true);
        });
    
        it('should return false', function () {
            let name = "kaushikjadav602_gmail.com";
            let res = validation.validateName(name);
            expect(res).to.be.equal(false);
        });
    });
})