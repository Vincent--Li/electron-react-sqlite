import { setList } from '../reducers/user.reducer'


export const fetchUsers = (values) => async (dispatch) => {
  const users = await api_fetchUsers.fetchUsers(values)
  dispatch(setList(users))
}