const { DataSource } = require('typeorm');
const Github_repo = require('./entities/Github_repo');


const db = new DataSource({
    type: "sqlite",
    database: "./repos-db.sqlite",
    synchronize: true,
    entities: [Github_repo],
  });
  
  module.exports = db;