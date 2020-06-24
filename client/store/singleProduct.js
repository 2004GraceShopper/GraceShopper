import axios from 'axios'

//action types
const SET_PRODUCT = 'SET_PRODUCT'
const CLEAR_PRODUCT = 'CLEAR_PRODUCT'

//inital state
const defaultProduct = {}

//action creators
const setProduct = product => {
  return {type: SET_PRODUCT, product}
}

const clearProduct = () => ({type: CLEAR_PRODUCT})

//thunk creators
export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      console.log(data)
      dispatch(setProduct(data))
    } catch (error) {
      console.log('Error with fetching a single Product', error)
    }
  }
}

export const clearProductThunk = () => {
  return dispatch => {
    try {
      dispatch(clearProduct())
    } catch (error) {
      console.log('this did not clear', error)
    }
  }
}

//reducer
export default function singleProductReducer(state = defaultProduct, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case CLEAR_PRODUCT:
      return defaultProduct
    default:
      return state
  }
}
