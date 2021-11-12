const cryptService = require('../cryptService');
module.exports = (request, response, next) => {
    let { id } = request.params;
    request.params.id = cryptService.decrypt(id);
    next();
}