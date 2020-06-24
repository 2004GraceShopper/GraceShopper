import axios from 'axios'
import {GET_USER, REMOVE_USER} from './user'

// Action types:
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const BUY_CART = 'BUY_CART'

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
const buyCart = freshCart => {
  return {
    type: BUY_CART,
    freshCart
  }
}

// Thunk creators:
export const addToCartInServer = (productId, quantity, cartId) => {
  return async dispatch => {
    console.log('AddToCart thunk is running! CartId: ', cartId)
    try {
      const {data} = await axios.put(`/api/cart/add/`, {
        productId,
        quantity,
        cartId
      })
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
      const {data} = await axios.delete(`/api/cart/${cartId}/${itemId}`)
      dispatch(deleteFromCart(data))
    } catch (error) {
      console.log('Error removing item from cart', error)
    }
  }
}

export const buyInServer = (cartId, userId) => {
  return async dispatch => {
    console.log('buyInServer thunk is running', cartId, userId)
    try {
      const res = await axios.put('/api/cart/buy', {cartId, userId})
      //console.log(res.data)
      dispatch(buyCart(res.data))
    } catch (error) {
      console.log('Error buying a full cart in the server', error)
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
      //return action.freshGuestCart
      return {}
    case BUY_CART:
      return action.freshCart
    default:
      return state
  }
}
