import knex from "knex";

const db = knex({
    client: "oracledb",
    connection: {
        user: "aapuser",
        password: "!QAZ2wsx",
        connectString: "acydaapod01.ndp.net:1521/aappdb1.ndp.net",
    },
});

export default db;