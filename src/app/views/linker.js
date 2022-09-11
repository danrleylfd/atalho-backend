const User = require('../models/auth');
const Linker = require('../models/linker');

module.exports.create = async(req, res) => {
  try {
    const { user, label, link } = req.body;
    if(await Linker.findOne({ label })) return res.status(401).json({ error: 'Label already exists.' });
    const linker = await Linker.create({ user, label, link });
    return res.status(200).json(linker);
  } catch (e) {
    return res.status(400).json({ error: 'Failed to save label.', code: e.message });//500
  }
}

module.exports.readAllByUser = async(req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ error: 'User not found/exist.' });
    const linkers = await Linker.find({ user: userId });
    if(linkers.length < 1) return res.status(404).json({ error: 'No labels found.' });
    return res.status(200).json(linkers);
  } catch (e) {
    return res.status(400).json({ error: 'Failed to list labels.', code: e.message });
  }
}

module.exports.read = async(req, res) => {
  try {
    const { label } = req.params;
    const linker = await Linker.findOne({ label });
    if(!linker) return res.status(404).json({ error: 'Label not found.' });
    return res.status(200).json({ link: linker.link });
    //return res.redirect(linker.link);
  } catch (e) {
    return res.status(400).json({ error: 'Failed to fetch label.', code: e.message });
  }
};

module.exports.update = async(req, res) => {
  try {
    const { userId, params: { oldLabel }, body: { newLabel, newLink } } = req;
    if(await Linker.findOne({ label: newLabel })) return res.status(401).json({ error: 'Label already exists.' });
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ error: 'User not found/exist.' });
    let linker = await Linker.findOne({ label: oldLabel });
    if(!linker) return res.status(404).json({ error: 'Label not found.' });
    if(linker.user.toString() !== userId) return res.status(401).json({ error: 'You are not the owner of this label.' });
    linker.label = (newLabel.length > 0) ? newLabel : linker.label;
    linker.link = (newLink.length > 0) ? newLink : linker.link;
    linker = await linker.save();
    return res.status(200).json(linker);
  } catch (e) {
    return res.status(400).json({ error: 'Failed to edit.', code: e.message });
  }
};

module.exports.delete = async(req, res) => {
  try {
    const { userId, params: { label } } = req;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ error: 'User not found/exist.' });
    let linker = await Linker.findOne({ label });
    if(!linker) return res.status(404).json({ error: 'Label not found.' });
    if(linker.user.toString() !== userId) return res.status(401).json({ error: 'You are not the owner of this label.' });
    await Linker.deleteOne({ label });
    return res.status(200).json({ message: 'Successfully deleted.' });
  } catch (e) {
    return res.status(400).json({ error: 'Failed to delete.', code: e.message });
  }
};
