import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'

//action creator
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS
  }
}

//thunk
export const fetchProducts = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(getProducts(data))
}
export const getTaggedInServer = tag => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/categories/${tag}`)
      dispatch(getProducts(data))
    } catch (error) {
      console.log('Error fetching a single Product', error)
    }
  }
}

export const clearProductsThunk = () => {
  return dispatch => {
    try {
      dispatch(clearProducts())
    } catch (error) {
      console.log('this did not clear', error)
    }
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CLEAR_PRODUCTS:
      return []
    default:
      return state
  }
}
