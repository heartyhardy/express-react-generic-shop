const express = require('express');
const router = express.Router();

const queries = require('../queries/customer-queries');
const auth = require('../auth/auth');
const { request, response } = require('express');

router.get('/customers', auth.isAuthorized, async(request, response, next) => {
    try{
        const results = await queries.getCustomers();
        response.status(200).json(results);
    }catch(error){
        next(error);
    }
});

router.post('/customers', async(request, response, next) => {
    try{
        const {username, password} = request.body;

        const results = await queries.addNewCustomer(username, password);
        response.status(201).json(results);
    }catch(error){
        next(error);
    }
});

module.exports = {
    router,
};
