const sequelize = require('../config/connection');
const { User, Pod } = require('../models');

const userData = require('./userData.json');
const podData = require('./podData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pod of podData) {
    await Pod.create({
      ...pod,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

