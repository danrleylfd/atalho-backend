const User = require("../../models/auth");
const Linker = require("../../models/linker");

module.exports = async(req, res) => {
  try {
    const { query: { id }, params: { label } } = req;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ error: "User not found/exist." });
    let linker = await Linker.findOne({ label });
    if(!linker) return res.status(404).json({ error: "Label not found." });
    if(linker.user.toString() !== id) return res.status(401).json({ error: "You are not the owner of this label." });
    await Linker.deleteOne({ label });
    return res.status(200).json({ message: "Successfully deleted." });
  } catch (e) {
    return res.status(400).json({ error: "Failed to delete.", code: e.message });
  }
};
