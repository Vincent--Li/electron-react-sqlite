const sqlite = require('../../../services/sqlite')

// NOTE: IMPORTANT! always name the route method with method.
// Because it is used inside init function.

const method = async (values) => {
    const TodoModel = sqlite.getModel('User')
    const result = await TodoModel.handleFetchUsers(values)
    return result
}

module.exports = {
    method
}
