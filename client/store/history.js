import axios from 'axios'

// Action types:
export const GET_HISTORY = 'GET_HISTORY'

// Action creators:
export const getHistory = purchasedCartsE => ({
  type: GET_HISTORY,
  purchasedCartsE
})

// Thunk creators:
export const fetchHistory = userId => async dispatch => {
  console.log('The fetch history thunk is running!', userId)
  try {
    const {data} = await axios.post('/api/history', {userId})
    dispatch(getHistory(data))
  } catch (error) {
    console.log(error)
  }
}

// Reducer:
export default function(state = [], action) {
  switch (action.type) {
    case GET_HISTORY:
      return action.purchasedCartsE
    default:
      return state
  }
}
