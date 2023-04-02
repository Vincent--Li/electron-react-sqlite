const sqlite = require('../../../services/sqlite')

// NOTE: IMPORTANT! always name the route method with method.
// Because it is used inside init function.
const method = async (args) => {
    const UserModel = sqlite.getModel('User')
    const result = await UserModel.handleCreateUser(args)
    return result
}

module.exports = {
    method
}
