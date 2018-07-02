import Gallery from '../models/galleryModel';


export async function list(req, res, next) {
  const galleries = await Gallery.find({}, null, { sort: { date: -1 } });
  res.status(200).json([...galleries]);
}

export async function retrieve(req, res, next) {
  const id = req.params.id;
  const gallery = await Gallery.findById(id);
  if (!gallery)
    return res.status(404).json({ error: `Gallery with id ${id} was not found` });
  res.status(200).json({ ...gallery['_doc'] });
}

export async function create(req, res, next) {
  const gallery = await new Gallery(req.value.body).save();
  res.status(201).json({ ...gallery['_doc'] });
}

export async function update(req, res, next) {
  const id = req.params.id;
  const updatedGallery = req.value.body;
  Gallery.findByIdAndUpdate(id, updatedGallery, (error, gallery) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!gallery)
      return res.status(404).json({ error: `Gallery with id ${id} was not found` });
    else
      return res.status(200).json({ ...gallery['_doc'], ...updatedGallery });
  });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Gallery.findByIdAndRemove(id, (error, gallery) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!gallery)
      return res.status(404).json({ error: `Gallery with id ${id} was not found` });
    else
      return res.status(200).json({...gallery['_doc']});
  });
}