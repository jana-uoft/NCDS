import General from '../models/generalModel';


export async function list(req, res, next) {
  const members = await General.findOne({name: "members"});  
  const contacts = await General.findOne({name: 'contacts'});
  res.status(200).json({members: members.values, contacts: contacts.values});
}

export async function update(req, res, next) {
  const {members, contacts} = req.body; 
  await General.findOneAndUpdate({name: 'members'}, {values: members});
  await General.findOneAndUpdate({name: 'contacts'}, {values: contacts});
  return res.status(200).json({...req.body});
}
