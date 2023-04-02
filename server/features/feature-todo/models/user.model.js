const Sequelize = require('sequelize')

const modelName = 'User'
const tableName = 'users'

const fields = {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sex: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}


// method: add single todo
const handleCreateUser = (conn, Model) => async (values) => {
  // add todo query: {username: 'test', age: '1', sex: 'male': '123'}
  const q = 'INSERT INTO users(username, age, sex) VALUES(:username, :age, :sex)'

  const res = await conn.query(q, {
    replacements: {
      ...values
    },
  })
  return res[0]
}

// method: get all existing users, by paging
const handleFetchUsers = (conn, Model) => async (values) => {
  // query:
  const q = "SELECT * FROM users WHERE username like '%:username%' ORDER BY id DESC LIMIT :limit OFFSET :offset;"
  const res = await conn.query(q, {
    ...values
  })
  return res[0]
}


const options = {
  tableName,
  freezeTableName: true,
  underscored: true,
  createdAt: false,
  updatedAt: false,
}

const init = (conn) => {
  const Model = conn.define(modelName, fields, options)
  // export the model methods here
  Model.handleFetchUsers = handleFetchUsers(conn, Model)
  return Model.sync()
}

module.exports = { name: modelName, init }
