'use strict';
const nodemailer = require('nodemailer');
var type,to;

var Sender = {};

Sender.email = function email(cron_ret) {
  this.transporter = nodemailer.createTransport({
    sendmail: true,
    newline: "unix",
    path: "/usr/sbin/sendmail"
  });
  this.to = cron_ret["delivery_to"];
  this.subject = cron_ret["name"];
  this.send = (body) =>{
      this.transporter.sendMail(
      {
        from: "reporting@uservices.com",
        to: this.to,
        subject: this.subject,
        html: body
        // text: "I hope this message gets delivered!"
      },
      (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
      }
    );
  }
};

/**
 * 
 * @param {id , name, active, cron schedule, query, eval, custom data, template html all located in ./template/, devlivery type, delivery to, last time it ran} cron_ret this is the row from the databse
 * 
 */
let Transport = function(cron_ret){
    this.type = cron_ret["delivery_type"];
    this.to = cron_ret["delivery_to"];
    // this.senderobj = null;
    if (this.type){
        this.senderobj = new Sender[this.type](cron_ret);
        console.log(this);
        
    }
}

Transport.prototype.send = function send(html) {
  let that = this;
  that.senderobj.send(html);
};

module.exports = Transport;