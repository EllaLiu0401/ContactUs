const { createContact } = require("../../services");

module.exports = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const newContact = await createContact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
