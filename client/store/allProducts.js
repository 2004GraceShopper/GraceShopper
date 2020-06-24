import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creator
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
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
//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
