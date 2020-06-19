import axios from 'axios'

const POST_GUEST = 'POST_GUEST'

const postGuest = guest => ({type: POST_GUEST, guest})

export const createGuest = guest => async dispatch => {
  try {
    const {data} = await axios.post('/api/guests', guest)
    dispatch(postGuest(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case POST_GUEST:
      return [...state, action.guest]
    default:
      return state
  }
}
