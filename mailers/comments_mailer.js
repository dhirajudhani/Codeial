const nodeMailer = require('../config/nodemailer');


//this is  another way of exporting a method
exports.newComment = async (comment) => {
    let htmlString =  await nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');
    

    nodeMailer.transporter.sendMail({
        from: 'dhirajudhani1313@gmail.com',
        to:   comment.user.email,
        subject: "New Coment Published",
        html: htmlString
    }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        // console.log('Message sent', info);
        return;
    }); 
}