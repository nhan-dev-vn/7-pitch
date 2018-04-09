const path = require('path');

module.exports = {
    entry: [
        './app.js', 
        './home/home.js',
        './pitch/pitch.js',
        './component/navigation/navigation.js',
        './component/footer/footer.js',
        './service/pitch-api-service.js',
        './service/geolocation-service.js',
        './service/spinner.js',
        './dialog/login/login-modal.js',
        './dialog/rent-pitch/rent-pitch-modal.js'
    ],
    output: {
        path: path.resolve(__dirname),
        filename: 'main.bundle.js'
    }
};