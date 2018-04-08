const path = require('path');

module.exports = {
    entry: [
        './app.js', 
        './home/home.js',
        './pitch/pitch.js',
        './component/navigation/navigation.js',
        './component/footer/footer.js',
        './service/pitch-api-service.js'
    ],
    output: {
        path: path.resolve(__dirname),
        filename: 'main.bundle.js'
    }
};