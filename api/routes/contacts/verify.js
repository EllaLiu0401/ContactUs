const { verifyContact } = require("../../services");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await verifyContact(id);

    if (result) {
      res.status(200).json({ message: "Contact verified successfully" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
