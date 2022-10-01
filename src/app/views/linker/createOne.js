const Linker = require("../../models/linker");

module.exports = async(req, res) => {
  try {
    const { id: user } = req.query;
    const { label, link } = req.body;
    if(!label && label.length < 0) return res.status(422).json({ error: "label missing." });
    if(!link && link.length < 0) return res.status(422).json({ error: "link missing." });
    const _linker = await Linker.findOne({ label });
    if(_linker) return res.status(401).json({ error: "Label already exists." });
    const linker = await Linker.create({ user, label, link });
    return res.status(200).json(linker);
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });//500
  }
}
