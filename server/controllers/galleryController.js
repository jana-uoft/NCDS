import Gallery from '../models/galleryModel';


module.exports = {
  list: async (req, res, next) => {
    const galleries = await Gallery.find({}, null, { sort: {date: -1}});
    res.status(200).json([ ...galleries ]);
  },

  retrieve: async (req, res, next) => {
    const id = req.params.id;
    const gallery = await Gallery.findById(id);
    if (!gallery)
      return res.status(404).json({ error: `Gallery with id ${id} was not found` });
    res.status(200).json({ ...gallery['_doc'] });
  },

  create: async (req, res, next) => {
    const gallery = await new Gallery(req.value.body).save();
    res.status(201).json({ gallery });
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updatedGallery = req.value.body;
    Gallery.findByIdAndUpdate(id, updatedGallery, (error, gallery) => {
      if (error)
        return res.status(404).json({ error: error.message });
      else if (!gallery)
        return res.status(404).json({ error: `Gallery with id ${id} was not found` });
      else
        return res.status(200).json({ ...gallery['_doc'], ...updatedGallery });
    })
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    Gallery.findByIdAndRemove(id, (error, gallery) => {
      if (error)
        return res.status(404).json({ error: error.message });
      else if (!gallery)
        return res.status(404).json({ error: `Gallery with id ${id} was not found` });
      else
        return res.status(204).json();
    })
  },
}