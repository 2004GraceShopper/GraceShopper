import axios from 'axios'
import {GET_USER, REMOVE_USER} from './user'

// Action types:
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

// Action creator:
const addToCart = fullerCart => {
  return {
    type: ADD_TO_CART,
    fullerCart
  }
}

const deleteFromCart = item => {
  return {
    type: DELETE_FROM_CART,
    item
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

export const removeFromCart = item => {
  return async dispatch => {
    console.log('removeFromCart thunk is runnning,', item)
    try {
      // how do I access item(x)'s Item table fields?
      // item = item id and that's it
      // i need cartId and productId for this request to work
      const {data} = await axios.delete(
        `/api/cart/${item.cartId}/${item.productId}`,
        item
      )

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
    case DELETE_FROM_CART:
      return {
        ...state.usersCart.products.filter(
          product => product.id !== action.item
        )
      }
    //do i also need to filter for the state.usersCart.items array?
    case REMOVE_USER:
      return {}
    default:
      return state
  }
}
