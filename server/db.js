const Pool=require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "yash@postgre27",
    host:"localhost",
    database:"perntodo",
    port:5432
});

module.exports=pool;