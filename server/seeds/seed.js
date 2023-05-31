const db = require('../config/connection');
const { User } = require('../models');

const seedData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123',
    posts: [],
    comments: [], 
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
    email: 'janesmith@example.com',
    password: 'password456',
    posts: [], 
    comments: [], 
  },
];

db.once('open', async () => {
  await User.deleteMany({});

  const users = await User.create(seedData);

  console.log('Users seeded!');
  process.exit(0);
});
