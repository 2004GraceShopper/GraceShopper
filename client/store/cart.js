import axios from 'axios'

//action types
const GET_CART = 'GET_CART'

//action creator
export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

//thunk
export const fetchCart = id => async dispatch => {
  const {data} = await axios.get(`/api/users/${id}`, id)
  dispatch(getCart(data))
}

//reducer
export default function cart(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
