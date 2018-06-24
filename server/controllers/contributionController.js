import Contribution from '../models/contributionModel';
import fs from 'fs';

let config = JSON.parse(fs.readFileSync('.env.json', 'utf8'));

module.exports = {
  list: async (req, res, next) => {
    const contributions = await Contribution.find({});
    res.status(200).json([ ...contributions ]);
  },

  retrieve: async (req, res, next) => {
    const id = req.params.id;
    const contribution = await Contribution.findById(id);
    if (!contribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    res.status(200).json({ ...contribution['_doc'] });
  },

  create: async (req, res, next) => {
    const contribution = await new Contribution(req.value.body).save();
    res.status(201).json({ contribution });
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updatedContribution = req.value.body;
    const contribution = await Contribution.findById(id);
    if (!contribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    await contribution.update(updatedContribution);
    res.status(200).json({ ...contribution['_doc'] });
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    const contribution = await Contribution.findById(id);
    if (!contribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    await contribution.remove();
    res.status(204).json();
  },
}