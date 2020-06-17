'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      billingAddress: '123 Pug Ln, PugLife, NJ 07047',
      creditCardNum: 5555555555554444,
      shippingAddress: '123 Pug Ln, PugLife, NJ 07047'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      billingAddress: '123 Pug Ln, PugLife, NJ 07047',
      creditCardNum: 4012888888881881,
      shippingAddress: '125 Pug Ln, PugLife, NJ 07047'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Boggle Jr.',
      publisher: 'Habro Gaming',
      price: 9.99,
      description:
        "Your preschooler's first Boggle game! Watch them learn as they play this colorful match game of  transforming letters into words.",
      imageUrl:
        'https://www.hasbro.com/common/productimages/en_US/8ec0b9cc6d4010148bf09efbf894f9d4/E45A8144D56FE1124137D44306D4E979.jpg'
    }),
    Product.create({
      name: 'Medium',
      publisher: 'Greater Than Games',
      price: 18.0,
      description:
        "Harness your extra-sensory powers by accessing your partner's mind and determing the medium: the word that connects the words on your two cards.",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71SAeW04Z0L._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Scrabble',
      publisher: 'Hasbro Gaming',
      price: 45.5,
      description:
        'Show your opponent whose boss in this classic war of words! Build words, add up your points and win.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81OjLGNO5VL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Scattergories',
      publisher: 'Hasbro Gaming',
      price: 16.99,
      description:
        'Think fast to come up with items to fit the categories that start with a specific letter. You score points when you come up with items that nobody else does.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81UD%2BvFaDHL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Taboo',
      publisher: 'Hasbro Gaming',
      price: 16.99,
      description:
        'Players race against the timer in this fun and fast-paced party game. Get teammates to say the Guess word without saying the forbidden words.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61W-BK3-8tL._AC_SL1330_.jpg'
    }),
    Product.create({
      name: 'The Game of Life',
      publisher: 'Hasbro Gaming',
      price: 22.0,
      description:
        'Choose the life you want and see what happens when unexpected twists change the game!',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61v4C8o6thL._AC_SY400_.jpg'
    }),
    Product.create({
      name: 'Root',
      publisher: 'Leder Games',
      price: 53.5,
      description:
        'Explore factions in a forest kingdom and find adventure as you gather supporters and coordinate revolts against the ruling regime ',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51Ath1IujLL._AC_SY400_.jpg'
    }),
    Product.create({
      name: "Hoppy Floppy's Happy Hunt",
      publisher: 'Educational Insights ',
      price: 15.5,
      description: 'Help Hoppy Floppy hunt for colorful carrots!',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51-8Td1uvAL._AC_SY400_.jpg'
    }),
    Product.create({
      name: 'The Very Hungry Caterpillar Card Game',
      publisher: 'Briarpatch',
      price: 10.1,
      description:
        'Explore the wonderous world of Eric Carle while learning the ABCs of the animal world.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51KjFRXYWsL._AC_SY400_.jpg'
    }),
    Product.create({
      name: 'Candy Land',
      publisher: 'Hasbro Gaming',
      price: 6.0,
      description:
        'Travel through Licorice Lagoon and Peppermint Forest to see the King of Candy Land! Who can reach there first?',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81AuRjy59tL._AC_SL1464_.jpg'
    }),
    Product.create({
      name: 'Hungry Hungry Hippos ',
      publisher: 'Hasbro Gaming',
      price: 17.0,
      description:
        'Hungry Hippos and friends are ready to jump into the feeding frenzy one you release the marbles',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/91EgnT-MXjL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Sorry',
      publisher: 'Hasbro Gaming',
      price: 9.99,
      description:
        "Draw cards to move your pawns around the board! The first player to move all their pawns back home wins! Don't draw a sorry card or you'll be sent back to the beginning!",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81IxU6Y4LFL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Trouble',
      publisher: 'Hasbro Gaming',
      price: 17.95,
      description:
        "Be the first player to get all your pieces all the way around the board by rolling the dice! Watch out for other players, if they land on your current space you're in trouble and have to go back to the beginning!",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71jiWj19NRL._AC_SL1448_.jpg'
    }),
    Product.create({
      name: "Can't Fool Me",
      publisher: 'Game Development Group',
      price: 30.0,
      description:
        "A cryptic clue is given and your a tasked to find the answer. Don't be fooled this is a game of wits!",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/91u9lalR3HL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Guess Who?: High School Reunion',
      publisher: 'Hasbo Gaming',
      price: 15.0,
      description:
        "Were you most likely to own a fake ID?, Were you most likely to leave the prom with someone else's date? Players guess each other's mystery person by giving yes or no answers to fun and outrageous questions.",
      imageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_eb0c7737-4492-4fce-aca5-c0f96f16217c?fmt=webp&wid=1400&qlt=80'
    }),
    Product.create({
      name: 'Dominion',
      publisher: 'Rio Grande Games',
      price: 33.75,
      description:
        'You want dominion. All around you are lands ruled by Petty Lords and plagued by anarchy. You will bring civilization to these people by uniting them under your banner. But Alas, others have the same idea...',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/9152Ik8HZ5L._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Insider',
      publisher: 'Oink Games',
      price: 18.81,
      description:
        'Are we controlled by what we hear and see? Do we really have free will? While commnunicating with the other players find the right answer to a quiz or find the person manipulating the discussion. Beware, the insider will do everything to hide their identity while misleading others.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/715I0yo6klL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'CodeNames',
      publisher: 'Czech Games',
      price: 15.45,
      description:
        'Two rival spymasters know the sercret identitues of 25 agents. Their teammates only know the agents by their codenames. The teams complete to see who can make contact with all of their agents first.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71ZHkM7fHwL._AC_SY879_.jpg'
    }),
    Product.create({
      name: 'Machi Koro',
      publisher: 'Pandasaurus Games',
      price: 45.99,
      description:
        'Congrats! You have just been elected as the Mayor of Machi Koro. Meets the demands of your citizens and grow Machi Koro to be the largest city in the region.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/916SrlIEQHL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Azul',
      publisher: 'Plan B Games',
      price: 40.99,
      description:
        'As a tile laying artist you have been challenged to embellish the walls of the royal palace of Dvora. Maximize the beauty of you work as well as your points by carefully drafting the correct quantity and styles of tiles.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/91AUH08qxfL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Blokus',
      publisher: 'Mattel Games',
      price: 18.99,
      description:
        'Stake your claim and defeat your opponents by strategically placing as many blocks on the board as possible. The player with the fewest remaining pieces win!',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71g60OwgOBL._AC_SL1500_.jpg'
    }),
    Product.create({
      name: 'Monopoly',
      publisher: 'Hasbro Gaming',
      price: 20.0,
      description:
        'Experience the ups and downs of collecting property.Buy, sell, dream and scheme your way to riches. But it pays to play nice because fortunes can change at the roll of a dice.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81qy%2BMXuxDL._AC_SL1392_.jpg'
    }),
    Product.create({
      name: 'Mall Madness',
      publisher: 'Hasbro Gaming',
      price: 25.0,
      description:
        'Shop till you drop with this electronic talking shopping-spree game. The first player who buys 6 items and gets to their destination wins!',
      imageUrl:
        'https://i.pinimg.com/originals/a0/a8/c9/a0a8c966e595ad38cc75d5613b77e9dc.jpg'
    }),
    Product.create({
      name: 'Trivial Pursuit',
      publisher: 'Hasbro Gaming',
      price: 58.0,
      description:
        'Gather friends and family to play a classic trivia game spanning 2,400 questions and 6 categories: Art & Literature,Geography, Science & Nature,Entertainment, Sports & Leisure, and History.The first player to correctly answer questions from each category (plus a bonus question) wins!',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/810bBCmZ9LL._AC_SL1425_.jpg'
    }),
    Product.create({
      name: 'Prime Climb',
      publisher: 'Math for Love',
      price: 28.0,
      description:
        'Roll the dice and add, subtract, multipy and divide your way to the the center of the board and win in this beautifully designed game which will inspire deep mathematical understanding while mastering arithmetic.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/913kkH4QHiL._AC_SX679_.jpg'
    }),
    Product.create({
      name: 'Hacker Cybersecurity Coding Game',
      publisher: 'ThinkFun',
      price: 26.0,
      description:
        'Learn programming principles through fun game play. Protect the world from cyber criminals by joining the white hat team of coders, hackers, and security engineers. Solve 120 coding problems ranging from beginner to expert level difficulty.',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61mzZZ1dMzL._AC_SL1000_.jpg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
