/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')

// USER MODEL TESTS
describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          billingAddress: '123 Street',
          creditCardNum: '5105105105105100',
          shippingAddress: '123 Street'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })

      it('has fields email, billingAddress, creditCardNum, shippingAddress', () => {
        expect(cody.email).to.equal('cody@puppybook.com')
        expect(cody.billingAddress).to.equal('123 Street')
        expect(cody.shippingAddress).to.equal('123 Street')
        expect(cody.creditCardNum).to.equal('5105105105105100')
      })
      // it('requires a valid credit card number', () => {
      //   expect()
      // })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

// PRODUCT MODEL TESTS
describe('User model', () => {
  let game1
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    game1 = {
      name: 'game1',
      publisher: 'publisher1',
      price: 200,
      description: 'this is a fun game',
      imageUrl: 'https://via.placeholder.com/150'
    }
  })

  it('sets the default quantity of the product to 20', () => {
    expect(game1.quantityInStock).to.equal(20)
  })
})
