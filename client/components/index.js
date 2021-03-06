/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './singleProduct'
export {default as AllProducts} from './AllProducts'
export {default as Cart} from './Cart'
export {default as GuestCheckoutForm} from './GuestCheckoutForm'
export {default as GuestHome} from './guest-home'
export {default as SignUpForm} from './SignUpForm'
export {default as OrderReview} from './OrderReview'
export {default as Thanks} from './Thanks'
export {default as OrderHistory} from './OrderHistory'
export {default as TaggedGame} from './TaggedGame'


