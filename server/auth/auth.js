const queries = require('../queries/customer-queries');
const { ErrorHandler } = require('../types/error');

const isAuthorized = async(req, res, next) => {
    try{
        const {userName, password} = req.body;

        const isMatching = await queries.getCustomerByCredentials(userName, password);
        if(isMatching){
            return next();
        }else{
            let err = new ErrorHandler(401, "Not Authorized!");
            return next(err);
        }
    }catch(err){
        return next(err);
    }
};

module.exports = {
    isAuthorized,
};