import Event from '../models/eventModel';


module.exports = {
  list: async (req, res, next) => {
    const events = await Event.find({}, null, { sort: {date: -1}});
    res.status(200).json([ ...events ]);
  },

  retrieve: async (req, res, next) => {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({ error: `Event with id ${id} was not found` });
    res.status(200).json({ ...event['_doc'] });
  },

  create: async (req, res, next) => {
    const event = await new Event(req.value.body).save();
    res.status(201).json({ event });
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updatedEvent = req.value.body;
    Event.findByIdAndUpdate(id, updatedEvent, (error, event) => {
      if (error)
        return res.status(404).json({ error: error.message });
      else if (!event)
        return res.status(404).json({ error: `Event with id ${id} was not found` });
      else
        return res.status(200).json({ ...event['_doc'], ...updatedEvent });
    })
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    Event.findByIdAndRemove(id, (error, event) => {
      if (error)
        return res.status(404).json({ error: error.message });
      else if (!event)
        return res.status(404).json({ error: `Event with id ${id} was not found` });
      else
        return res.status(204).json();
    })
  },
}