import axios from 'axios'
import {GET_USER} from './user'

// Action types:
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const SET_ITEMS = 'SET_ITEMS'

// Action creator:
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}
const addToCart = fullerCart => {
  return {
    type: ADD_TO_CART,
    fullerCart
  }
}
const setItems = items => {
  return {
    type: SET_ITEMS,
    items
  }
}

// Thunk creator:
// if !user, the id passed will be null
export const fetchCart = (id, isUser) => {
  return async dispatch => {
    console.log('fetchCart thunk is running: ' + id)
    try {
      // Prepare a flexible route ending:
      let userOrGuest = isUser ? `${id}` : `guest`

      {
        /*Use the flexible route ending to get the guest OR user cart:*/
      }
      const {data} = await axios.post(`/api/cart/${userOrGuest}`)
      dispatch(setCart(data))
    } catch (error) {
      console.log('Error fetching cart from server: ', error)
    }
  }
}

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

export const fetchItems = cartId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${cartId}`)
      dispatch(setItems(data))
    } catch (error) {
      console.log('Error fetching items from server', error)
    }
  }
}

// Reducer:
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_TO_CART:
      return action.fullerCart
    case SET_ITEMS:
      // cart : { 0: {items}, 1: {} }
      return {...state, eagerItems: action.items}
    default:
      return state
  }
}
