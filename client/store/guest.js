import axios from 'axios'
import history from '../history'

// Action types:
const POST_GUEST = 'POST_GUEST'

// Action creators:
const postGuest = guest => ({type: POST_GUEST, guest})

// Thunk creators:
export const createGuest = guest => async dispatch => {
  try {
    const res = await axios.post('/api/guests', guest)
    console.log('What is the front getting back?: ', res)
    dispatch(postGuest(res.data))

    try {
      history.push('/')
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr)
    }
  } catch (err) {
    console.log('Diddlysquat')
    console.log('Error: ', err)
    console.error(err)
  }
}

// Reducer:
export default function(state = {}, action) {
  switch (action.type) {
    case POST_GUEST:
      return action.guest
    default:
      return state
  }
}
