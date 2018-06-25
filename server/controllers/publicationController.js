import Publication from '../models/publicationModel';


module.exports = {
  list: async (req, res, next) => {
    const publications = await Publication.find({}, null, { sort: {date: -1}});
    res.status(200).json([ ...publications ]);
  },

  retrieve: async (req, res, next) => {
    const id = req.params.id;
    const publication = await Publication.findById(id);
    if (!publication)
      return res.status(404).json({ error: `Publication with id ${id} was not found` });
    res.status(200).json({ ...publication['_doc'] });
  },

  create: async (req, res, next) => {
    const publication = await new Publication(req.value.body).save();
    res.status(201).json({ publication });
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updatedPublication = req.value.body;
    Publication.findByIdAndUpdate(id, updatedPublication, (error, publication) => {
      if (error)
        return res.status(404).json({ error: error.message });
      else if (!publication)
        return res.status(404).json({ error: `Publication with id ${id} was not found` });
      else
        return res.status(200).json({ ...publication['_doc'], ...updatedPublication });
    })
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    Publication.findByIdAndRemove(id, (error, publication) => {
      if (error)
        return res.status(404).json({ error: error.message });
      else if (!publication)
        return res.status(404).json({ error: `Publication with id ${id} was not found` });
      else
        return res.status(204).json();
    })
  },
}