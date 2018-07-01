import Contribution from '../models/contributionModel';


export async function list(req, res, next) {
  const contributions = await Contribution.find({}, null, { sort: { date: -1 } });
  res.status(200).json([...contributions]);
}

export async function retrieve(req, res, next) {
  const id = req.params.id;
  const contribution = await Contribution.findById(id);
  if (!contribution)
    return res.status(404).json({ error: `Contribution with id ${id} was not found` });
  res.status(200).json({ ...contribution['_doc'] });
}

export async function create(req, res, next) {
  const contribution = await new Contribution(req.value.body).save();
  res.status(201).json({ ...contribution['_doc'] });
}

export async function update(req, res, next) {
  const id = req.params.id;
  const updatedContribution = req.value.body;
  Contribution.findByIdAndUpdate(id, updatedContribution, (error, contribution) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!contribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    else
      return res.status(200).json({ ...contribution['_doc'], ...updatedContribution });
  });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Contribution.findByIdAndRemove(id, (error, contribution) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!contribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    else
      return res.status(204).json();
  });
}