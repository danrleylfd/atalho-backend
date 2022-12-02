const Linker = require("../../models/linker");

module.exports = async (req, res) => {
  try {
    const { label } = req.params;
    if (!label || label.trim().length === 0) return res.status(422).json({ error: "label missing." });
    const linker = await Linker.findOne({ label }).populate("user").exec();
    if (!linker) return res.status(404).json({ error: "Label not found." });
    return res.status(200).json({ link: linker.link });
  } catch (e) {
    return res.status(400).json({ error: "Bad Request.", code: e.message });
  }
};
