import axios from 'axios'
import {GET_USER} from './user'

// Action types:
const SET_CART = 'SET_CART'

// Action creator:
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

// Thunk creator:
// if !user, the id passed will be a guestId
export const fetchCart = (id, isUser) => {
  return async dispatch => {
    console.log('fetchCart: ' + id)
    try {
      // Prepare a flexible route ending:
      let userOrGuest
      isUser ? (userOrGuest = `${id}`) : (userOrGuest = `guest`)
      console.log('isUser: ', isUser)
      console.log('post route: ', `/api/cart/${userOrGuest}`)

      // Use the flexible route ending to get the guest OR user cart:
      const {data} = await axios.post(`/api/cart/${userOrGuest}`)
      console.log("This should be the user's cart: ", data)
      dispatch(setCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer:
export default function cartReducer(state = {}, action) {
  console.log('**** CART REDUCER', action.type, state)

  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
