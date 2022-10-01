const User = require("../../models/auth");
const Linker = require("../../models/linker");

module.exports = async(req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ error: "User not found/exist." });
    const linkers = await Linker.find({ user: id });
    if(linkers.length < 1) return res.status(404).json({ error: "No labels found." });
    return res.status(200).json(linkers);
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
}
