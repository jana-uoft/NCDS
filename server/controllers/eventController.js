import Event from '../models/eventModel';


export async function list(req, res, next) {
  const events = await Event.find({}, null, { sort: { date: -1 } });
  res.status(200).json([...events]);
}

export async function retrieve(req, res, next) {
  const id = req.params.id;
  const event = await Event.findById(id);
  if (!event)
    return res.status(404).json({ error: `Event with id ${id} was not found` });
  res.status(200).json({ ...event['_doc'] });
}

export async function create(req, res, next) {
  const event = await new Event(req.value.body).save();
  res.status(201).json({ event });
}

export async function update(req, res, next) {
  const id = req.params.id;
  let updatedEvent = req.value.body;
  Event.findByIdAndUpdate(id, updatedEvent, (error, event) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!event)
      return res.status(404).json({ error: `Event with id ${id} was not found` });
    else
      return res.status(200).json({ ...event['_doc'], ...updatedEvent });
  });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Event.findByIdAndRemove(id, (error, event) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!event)
      return res.status(404).json({ error: `Event with id ${id} was not found` });
    else
      return res.status(204).json();
  });
}