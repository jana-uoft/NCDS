import Event from '../models/obituaryModel';


export async function list(req, res, next) {
  const obituaryies = await Event.find({}, null, { sort: { date: -1 } });
  res.status(200).json([...obituaryies]);
}

export async function retrieve(req, res, next) {
  const id = req.params.id;
  const obituary = await Event.findById(id);
  if (!obituary)
    return res.status(404).json({ error: `Event with id ${id} was not found` });
  res.status(200).json({ ...obituary['_doc'] });
}

export async function create(req, res, next) {
  const obituary = await new Event(req.value.body).save();
  res.status(201).json({ obituary });
}

export async function update(req, res, next) {
  const id = req.params.id;
  const updatedEvent = req.value.body;
  Event.findByIdAndUpdate(id, updatedEvent, (error, obituary) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!obituary)
      return res.status(404).json({ error: `Event with id ${id} was not found` });
    else
      return res.status(200).json({ ...obituary['_doc'], ...updatedEvent });
  });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Event.findByIdAndRemove(id, (error, obituary) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!obituary)
      return res.status(404).json({ error: `Event with id ${id} was not found` });
    else
      return res.status(204).json();
  });
}