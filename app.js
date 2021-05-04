const mysql = require('mysql2/promise');
const config = require('./config');

async function setDbConnection() {
    return mysql.createConnection(config);
}

async function endDbConnection(connection) {
    connection.end();
}

async function getRows() {
    let connection = await setDbConnection();
    const [ rows, fields ] = await connection.execute('select * from users');
    // await db_connection.execute('update users set firstName="'+'Ksenia'+'" where id = 2');
    await endDbConnection(connection);
    return rows;
}

async function setFirstName(id, name) {
    let connection = await setDbConnection();
    await connection.execute('update users set firstName="'+ name +'" where id = "'+ id +'"');
    await endDbConnection(connection);
}

async function main() {
    console.log(await getRows());
    await setFirstName(1, "Anatoly");
    console.log(await getRows());
}

main();