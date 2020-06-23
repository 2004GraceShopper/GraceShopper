import axios from 'axios'
import {GET_USER, REMOVE_USER} from './user'

// Action types:
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// Action creators:
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
const deleteFromCart = updatedCart => {
  return {
    type: DELETE_FROM_CART,
    updatedCart
  }
}

// Thunk creators:
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

export const increaseQuant = (cartId, productId) => {
  return async dispatch => {
    try {
      console.log('the product info', productId, cartId)
      const {data} = await axios.put(`/api/cart/edit/increase`, {
        cartId,
        productId
      })
      console.log(data)
      dispatch(updateCart(data))
    } catch (error) {
      console.log('Error editing item quanitiy in cart', error)
    }
  }
}
export const decreaseQuant = (cartId, productId) => {
  return async dispatch => {
    try {
      console.log('the product info', productId, cartId)
      const {data} = await axios.put(`/api/cart/edit/decrease`, {
        cartId,
        productId
      })
      console.log(data)
      dispatch(updateCart(data))
    } catch (error) {
      console.log('Error editing item quanitiy in cart', error)
    }
  }
}

export const removeFromCart = (itemId, cartId) => {
  return async dispatch => {
    console.log('removeFromCart thunk is runnning', cartId, itemId)
    try {
      // how do I access item(x)'s Item table fields?
      // item = item id and that's it
      // i need cartId and productId for this request to work
      const {data} = await axios.delete(`/api/cart/${cartId}/${itemId}`)

      dispatch(deleteFromCart(data))
    } catch (error) {
      console.log('Error removing item from cart', error)
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
    case DELETE_FROM_CART:
      return action.updatedCart
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
