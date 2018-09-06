import General from '../models/generalModel';


export async function list(req, res, next) {
  const home = await General.findOne({name: "home"});  
  res.status(200).json(home.values);
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
