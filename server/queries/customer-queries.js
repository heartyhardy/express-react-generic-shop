const bcrypt = require('bcryptjs');
const Pool = require('pg').Pool;

const {ErrorHandler} = require('../types/error');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'littleshop',
    password: '123',
    port: 5432,
});

const getCustomers = async() => {
    try{
        const result = await pool.query(`
            SELECT * FROM "Customer"
            ORDER BY id ASC
        `);
        return result.rows;
    }catch(err){
        throw new ErrorHandler(500, "Error occred while fetching data!");
    }
};

const getCustomerById = async(id) => {
    try{

        const uid = parseInt(id);

        const result = await pool.query(`
            SELECT * FROM "Customer"
            WHERE id = $1    
        `,
        [uid]);

        return result.rows;
    }catch(error){
        throw new ErrorHandler(401, "Not Authorized!");
    }
};

const getCustomerByCredentials = async(userName, password) => {
    try{
        const user = userName.toLowerCase();

        const result = await pool.query(`
            SELECT * FROM "Customer"
            WHERE username = $1    
        `,
        [user]
        );

        if(result.rows.length > 0){
            const hashed = result.rows[0].password;

            const isMatching = await bcrypt.compare(password, hashed);
            return isMatching;
        }else{
            throw new ErrorHandler(401, "Invalid credentials!");
        }
    }catch(error){
        throw new ErrorHandler(500, "Error occured querying the database");
    }

};

const addNewCustomer = async(userName, password) => {
    
    try{
        const user = userName.toLowerCase();
        const hashed = await bcrypt.hash(password, 8);
        
        const result = await pool.query(`
            INSERT INTO "Customer" (username, password)
            VALUES ($1, $2)
            RETURNING id, username
        `,
        [user, hashed]
        );

        return result.rows;
    }catch(error){
        throw new ErrorHandler(500, "Error occured saving to database");
    }
};



module.exports = {
    getCustomers,
    getCustomerById,
    getCustomerByCredentials,
    addNewCustomer,
};