
const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'dhirajudhani870@gmail.com',
            pass: 'ieshffciovboasqs' // this is a hex code generated by 2 step verification in google which encrypt the password of user
        }
    },
    google_client_id: "667219078412-dje2u6511ctujm1bna6fv3644s8lqmid.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8001/users/auth/google/callback",
    jwt_secret: 'codeial'

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIALSESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD // this is a hex code generated by 2 step verification in google which encrypt the password of user
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_CALL_BACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);