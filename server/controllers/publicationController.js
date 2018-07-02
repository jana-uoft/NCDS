import Publication from '../models/publicationModel';


export async function list(req, res, next) {
  const publications = await Publication.find({}, null, { sort: { date: -1 } });
  res.status(200).json([...publications]);
}

export async function retrieve(req, res, next) {
  const id = req.params.id;
  const publication = await Publication.findById(id);
  if (!publication)
    return res.status(404).json({ error: `Publication with id ${id} was not found` });
  res.status(200).json({ ...publication['_doc'] });
}

export async function create(req, res, next) {
  const publication = await new Publication(req.value.body).save();
  res.status(201).json({ ...publication['_doc'] });
}

export async function update(req, res, next) {
  const id = req.params.id;
  const updatedPublication = req.value.body;
  Publication.findByIdAndUpdate(id, updatedPublication, (error, publication) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!publication)
      return res.status(404).json({ error: `Publication with id ${id} was not found` });
    else
      return res.status(200).json({ ...publication['_doc'], ...updatedPublication });
  });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Publication.findByIdAndRemove(id, (error, publication) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!publication)
      return res.status(404).json({ error: `Publication with id ${id} was not found` });
    else
      return res.status(200).json({...publication['_doc']});
  });
}