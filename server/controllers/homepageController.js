import General from '../models/generalModel';


export async function list(req, res, next) {
  const home = await General.findOne({name: "home"});  
  const visitors = await General.findOne({name: 'visitors'});
  await visitors.update({values: {count: visitors.values.count+1}});
  res.status(200).json({...home.values, visitors: visitors.values.count+1});
}

export async function update(req, res, next) {
  const updatedHome = req.body; 
  General.findOneAndUpdate({name: 'home'}, {values: updatedHome}, (error, home) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else {     
      return res.status(200).json({...home.values, ...req.body});
    }
  });
}
