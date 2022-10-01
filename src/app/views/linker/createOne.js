const Linker = require("../../models/linker");

module.exports = async(req, res) => {
  try {
    const { user, label, link } = req.body;
    if(await Linker.findOne({ label })) return res.status(401).json({ error: "Label already exists." });
    const linker = await Linker.create({ user, label, link });
    return res.status(200).json(linker);
  } catch (e) {
    return res.status(400).json({ error: "Failed to save label.", code: e.message });//500
  }
}
