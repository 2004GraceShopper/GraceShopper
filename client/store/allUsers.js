import axios from 'axios'

const POST_USER = 'POST_USER'

const postUser = user => ({type: POST_USER, user})

export const createUser = user => async dispatch => {
  try {
    const {data} = await axios.post('/api/users', user)
    dispatch(postUser(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case POST_USER:
      return [...state, action.user]
    default:
      return state
  }
}
