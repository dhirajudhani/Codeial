const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// transporter is a part who sends the email
let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data , relativePath) => {
    let mailHTML; // this make our email template nice using html
    ejs.renderFile(
        path.join(__dirname, '../views/mailers' , relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template');
                return;
            }
            
            mailHTML = template;
            
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate

}