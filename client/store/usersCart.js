import axios from 'axios'
import {GET_USER, REMOVE_USER} from './user'

// Action types:
const ADD_TO_CART = 'ADD_TO_CART'

// Action creator:
const addToCart = fullerCart => {
  return {
    type: ADD_TO_CART,
    fullerCart
  }
}

// Thunk creator:
export const addToCartInServer = (productId, quantity, cartId) => {
  return async dispatch => {
    console.log('AddToCart thunk is running! CartId: ', cartId)
    try {
      const {data} = await axios.put(
        `/api/cart/add/${productId}/${quantity}/${cartId}`
      )
      dispatch(addToCart(data))
    } catch (error) {
      console.log('Error adding to cart in server: ', error)
    }
  }
}

// Reducer:
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      console.log('GET USER inside USERSCART REDUCER')
      console.log('action.userCart: ', action.userCart)
      return action.userCart
    case ADD_TO_CART:
      return action.fullerCart
    case REMOVE_USER:
      //return action.freshGuestCart
      return {}
    default:
      return state
  }
}
