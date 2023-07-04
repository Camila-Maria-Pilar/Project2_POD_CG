const { Pod } = require('../models/Pod');

// Controller actions
const getAllPods = async (req, res) => {
  try {
    const pods = await Pod.findAll();
    res.json(pods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createPod = async (req, res) => {
  try {
    // Retrieve data from request body
    const { title, description } = req.body;

    // Create a new POD entry
    const pod = await Pod.create({ title, description });

    res.status(201).json(pod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllPods,
  createPod,
};
