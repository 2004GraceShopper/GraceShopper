import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import sinon from 'sinon'
//import {MemoryRouter} from 'react-router'
const adapter = new Adapter()
enzyme.configure({adapter})
//import waitForExpect from 'wait-for-expect'

import {createStore} from 'redux'
import store from '../../client/store'
import reducer, {
  getProducts,
  fetchProducts
} from '../../client/store/allProducts'
import AllProducts from './AllProducts'
import {MemoryRouter} from 'react-router-dom'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = []

describe('AllProducts', () => {
  const products = [
    {
      id: 1,
      name: 'product1',
      publisher: 'publisher1',
      price: 10,
      description: 'desc 1'
    },
    {
      id: 2,
      name: 'product2',
      publisher: 'publisher2',
      price: 20,
      description: 'desc 2'
    },
    {
      id: 3,
      name: 'product3',
      publisher: 'publisher3',
      price: 30,
      description: 'desc 3'
    }
  ]

  describe('Redux', () => {
    //testing action creators and thunk by using simulating api requests (mockAxios)
    // we also configure a mock store and create some initial state
    let fakeStore
    let mockAxios
    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      mockAxios.onGet('/api/products').reply(200, products)
      fakeStore = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      fakeStore.clearActions()
    })

    describe('fetch all products', () => {
      it('setProducts action creator', () => {
        expect(getProducts(products)).to.deep.equal({
          type: 'GET_PRODUCTS',
          products
        })
      })
      it('fetchProducts thunk creator returns a thunk that gets /api/products', async () => {
        await fakeStore.dispatch(fetchProducts())
        const [getRequest] = mockAxios.history.get
        expect(getRequest.url).to.equal('/api/products')
        const actions = fakeStore.getActions()
        expect(actions[0].type).to.equal('GET_PRODUCTS')
        expect(actions[0].products).to.deep.equal(products)
      })
    })
  })
  describe('Reducer', () => {
    //testing the reducers so we import and use actual reducers used for the store
    // we also create a real store
    // we check the that the reducer changes the state correctly
    let fakeStore
    beforeEach(() => {
      fakeStore = createStore(reducer)
    })
    describe('all products reducer', () => {
      it('returns the initial state by default', () => {
        expect(reducer(undefined, {})).to.deep.equal(initialState)
      })
      it('reduces on GET_PRODUCTS action', () => {
        const action = {type: 'GET_PRODUCTS', products}
        const prevState = fakeStore.getState()
        fakeStore.dispatch(action)
        const newState = fakeStore.getState()
        expect(newState).to.be.deep.equal(products)
        expect(newState).to.not.be.equal(prevState)
      })
    })
  })
})
