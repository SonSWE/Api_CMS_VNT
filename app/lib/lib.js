'use strict';

const hash = require('blueimp-md5');
const jwt = require('jsonwebtoken');

module.exports = class {
  static async passwordHash(password) {
    return hash((btoa(password)));
  }

  static generateAuthToken(user, key) {
    return jwt.sign(user, key);
  }

  static compareToken(token, key) {
    return jwt.verify(token, key);
  }

  static randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
  }

  static randomNumber(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}