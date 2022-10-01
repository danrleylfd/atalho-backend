const Linker = require("../../models/linker");

module.exports = async(req, res) => {
  try {
    const { label } = req.params;
    const linker = await Linker.findOne({ label });
    if(!linker) return res.status(404).json({ error: "Label not found." });
    return res.status(200).json({ link: linker.link });
    //return res.redirect(linker.link);
  } catch (e) {
    return res.status(400).json({ error: "Failed to fetch label.", code: e.message });
  }
};
