import axios from 'axios'
import history from '../history'
import {fetchHistory} from './history'

/**
 * ACTION TYPES
 */
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {
  isDefaultUser: true
}

/**
 * ACTION CREATORS
 */
export const getUser = data => ({
  type: GET_USER,
  user: data.user,
  userCart: data.userCart
})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    try {
      if (res.data.user.id) {
        console.log('this better be a userId: ', res.data.user.id) // 1
        dispatch(fetchHistory(res.data.user.id))
      }
    } catch (error) {
      console.log('Error inside second try-catch, which gets product history.')
    }
  } catch (err) {
    console.error(err)
  }
}

// Changed this so it creates a whole user, not just email/password
export const auth = (user, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, user)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      if (action.user) {
        return action.user
      }
      return state
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
