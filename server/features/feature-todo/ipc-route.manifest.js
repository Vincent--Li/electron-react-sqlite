/*
    EXPORT FEATURE IPC ROUTES HERE
*/

module.exports = {

    /*
        SETUP FEATURE IPC ENDPOINTS
    */

    routes: [
        {
            name: 'add-todo',
            handler: require('./routes/add-todo'),
        },
        {
            name: 'get-todo',
            handler: require('./routes/get-todo'),
        },
        {
            name: 'update-todo',
            handler: require('./routes/update-todo'),
        },
        {
            name: 'delete-todo',
            handler: require('./routes/delete-todo'),
        },
        {
            name: 'get-todos',
            handler: require('./routes/get-todos'),
        },
        {
            name: 'delete-todos',
            handler: require('./routes/delete-todos'),
        },
        {
            name: 'create-user',
            handler: require('./routes/create-user'),
        },
        {
            name: 'fetch-users',
            handler: require('./routes/fetch-users'),
        },
        {
            name: 'fetch-users-count',
            handler: require('./routes/fetch-users-count'),
        },

    ]
}
