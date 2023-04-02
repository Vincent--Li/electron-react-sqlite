import todoReducer from './reducers/todo.reducer'
import userReducer from './reducers/user.reducer'
import * as todoService from './services/todo.service'
import * as userService from './services/user.service'
// import todoListener from './listeners/todo.listener'

export const reducers = {
    todos: todoReducer,
    users: userReducer,
}

export const services = [todoService, userService]

export const listeners = [
    // todoListener,
]
