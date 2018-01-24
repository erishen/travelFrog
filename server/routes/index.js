module.exports = function (app) {
    app.use('/', require('./inke'));
    app.use('/inke', require('./inke'));
    app.use('/seniverse', require('./seniverse'));
    app.use('/static', require('./static'));
    app.use('/react', require('./react'));
};
