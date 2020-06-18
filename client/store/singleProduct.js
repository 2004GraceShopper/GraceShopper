import axios from 'axios'

//action types
const SET_PRODUCT = 'SET_PRODUCT'

//inital state
const defaultProduct = {}

//action creators
const setProduct = product => {
  return {type: SET_PRODUCT, product}
}

//thunk creators
export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setProduct(data))
    } catch (error) {
      console.log('Error with fetching a single Product', error)
    }
  }
}

//reducer
export default function singleProductReducer(state = defaultProduct, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
