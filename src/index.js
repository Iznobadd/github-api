const db = require('./db');
const fetch = require('node-fetch-commonjs');
const Github_repo = require('./entities/Github_repo');





async function start() {
    console.log(new Date().toISOString() + " Start initializing db...");
    console.time('init db');
    await db.initialize();
    console.timeEnd('init db');

    console.log(new Date().toISOString() + " Clearing db data...");
    console.time('clear db');
    await db.getRepository(Github_repo).clear();
    console.timeEnd('clear db');

    console.log(new Date().toISOString() + " Getting most popular repos from github API...");
    console.time('fetch repos');
    let result = await fetch("https://api.github.com/search/repositories?q=stars:%3E1&sort=stars")
    .then((res) => res.json());
    console.timeEnd('fetch repos');

    console.log(new Date().toISOString() + " Saving most popular repos to database...");
    console.time('save repos');
    const itemArray = result.items.map((item) => {
        return {id: item.id, name: item.name, stars: item.stargazers_count}
    });
    await db.getRepository(Github_repo).save(itemArray);
    console.timeEnd('save repos');
}

start();

/*
result.items.map((item) => {
        [db.getRepository(Github_repo).save({id: item.id, name: item.name, stars: item.stargazers_count})].push

    });
*/

