const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: "Github_repo",
    columns: {
        id: {
            type: "int",
            primary: true,
        },
        name: {
            type: "text",
        },
        stars: {
            type: "int",
        }
    }
})