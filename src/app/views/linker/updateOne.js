const User = require("../../models/auth");
const Linker = require("../../models/linker");

module.exports = async(req, res) => {
  try {
    const { id } = req.query;
    const { oldLabel } = req.params;
    const { newLabel, newLink } = req.body;
    if(!oldLabel && oldLabel.length < 0) return res.status(422).json({ error: "oldLabel missing." });
    if(!newLabel && newLabel.length < 0) return res.status(422).json({ error: "newLabel missing." });
    if(!newLink && newLink.length < 0) return res.status(422).json({ error: "newLink missing." });
    if(await Linker.findOne({ label: newLabel })) return res.status(401).json({ error: "Label already exists." });
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ error: "User not found/exist." });
    let linker = await Linker.findOne({ label: oldLabel });
    if(!linker) return res.status(404).json({ error: "Label not found." });
    if(linker.user.toString() !== id) return res.status(401).json({ error: "You are not the owner of this label." });
    linker.label = (newLabel.length > 0) ? newLabel : linker.label;
    linker.link = (newLink.length > 0) ? newLink : linker.link;
    linker = await linker.save();
    return res.status(200).json(linker);
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
};
