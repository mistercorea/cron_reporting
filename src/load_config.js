'use strict';
const ini = require("node-ini");

let Configuration = function(env = false,database = false,smtp = false){
    this.setEnv(env);
    this.setDatabase(database);
    this.setSMTP(smtp);
    // this.env = "PRODUCTION"

}

Configuration.prototype.setEnv = function(val = false) {
    if (val){
        this.env = val
    }
    else{
        this.env = ini.parseSync("/etc/uservices/env.ini")["ENV"]["ENV"]
    }
}

Configuration.prototype.setDatabase = function(val = false) {
  if (val) {
    this.database = val;
  } else {
    let database = ini.parseSync("/etc/uservices/database.ini")[this.env];
    // database ini format
    // {HOST:'',USERNAME:'',PASSWORD:'',DATABASE:''}
    this.database = { host: database["HOST"], user: database["USERNAME"], password: database["PASSWORD"], database: database["DATABASE"] };
  }
};

Configuration.prototype.setSMTP= function(val = false) {
  if (val) {
    this.smtp = val;
  } else {
    let smtp = ini.parseSync("/etc/uservices/smtp.ini")[this.env];
    this.smtp = {host:smtp['HOST'],user:smtp['USERNAME'],password:smtp['PASSWORD'],port:smtp['PORT']}
  }
};


module.exports = Configuration;

  