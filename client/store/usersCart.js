import axios from 'axios'
import {GET_USER, REMOVE_USER} from './user'

// Action types:
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'

// Action creator:
const addToCart = fullerCart => {
  return {
    type: ADD_TO_CART,
    fullerCart
  }
}

export const updateCart = cart => {
  return {
    type: UPDATE_CART,
    cart
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
      console.log('***This is the data', data)
      dispatch(addToCart(data))
    } catch (error) {
      console.log('Error adding to cart in server: ', error)
    }
  }
}

export const updateQuant = (cartId, productId, edit) => {
  return async dispatch => {
    try {
      console.log('the product info', productId, cartId, edit)
      const {data} = await axios.put(`/api/cart/edit/`, {
        cartId,
        productId,
        edit
      })
      console.log(data)
      dispatch(updateCart(data))
    } catch (error) {
      console.log('Error editing item quanitiy in cart', error)
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
    case UPDATE_CART:
      return action.cart
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
