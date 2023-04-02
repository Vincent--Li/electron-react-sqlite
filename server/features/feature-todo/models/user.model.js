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
  const q = 'INSERT INTO users(username, age, sex) VALUES(:username, :age, :sex)'
  console.log("insert values", values)
  const res = await conn.query(q, {
    replacements: {
      ...values
    },
  })
  console.log("insert result is ", res[0])
  return res[0]
}

// method: get all existing users, by paging
const handleFetchUsers = (conn, Model) => async (values) => {
  // query:
  const q = `SELECT * FROM users 
            ${values.username ? ("WHERE username like '%" + values.username + "%'" ): ""} ORDER BY id DESC LIMIT :limit OFFSET :offset;`
  console.log("fetchUsername", values)
  const res = await conn.query(q, {
    replacements: {
      username: values.username,
      limit: values.pageSize,
      offset: (values.pageNumber - 1) * values.pageSize,
    }
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
  Model.handleCreateUser = handleCreateUser(conn, Model)
  return Model.sync()
}

module.exports = { name: modelName, init }
