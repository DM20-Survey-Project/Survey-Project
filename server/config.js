module.exports = {
  PORT: 3000,
  MONGO_URI: 'mongodb://localhost:27017/survey-project',
  SESSION_SECRET: 'devmtnSurveysProject',
  AUTH_CONFIG: {
        app: 'surveysclone',
        client_token: '110FDC065384A7B7E5BC2787D344B14AE761ECD1F2621D7070960FE4105B7757',
        callbackURL: 'http://localhost:3000/auth/devmtn/callback',
        jwtSecret: 'hashtagDevmountinIsAweseomeHashtagLearnToCode'
    }
}