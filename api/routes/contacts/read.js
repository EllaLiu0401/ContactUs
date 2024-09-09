const { getContacts } = require("../../services");

module.exports = async (req, res) => {
  try {
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
