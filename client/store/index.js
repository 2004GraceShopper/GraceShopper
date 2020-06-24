import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// Consider renaming to singleUser
import user from './user'
import guest from './guest'
import products from './allProducts'
import users from './allUsers'
import singleProduct from './singleProduct'
import usersCart from './usersCart'
import history from './history'

const reducer = combineReducers({
  user,
  users,
  guest,
  products,
  singleProduct,
  usersCart,
  history
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
