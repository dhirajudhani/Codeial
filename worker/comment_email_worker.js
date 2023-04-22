
const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');


//process function calls the mailer
queue.process('emails', function(job, done){
    console.log('email worker is processing a job',job.data);

    //this worker should be called from the controller
    commentsMailer.newComment(job.data);

    done();
});