import Contribution from '../models/contributionModel';
import fs from 'fs';

let config = JSON.parse(fs.readFileSync('.env.json', 'utf8'));

module.exports = {
  list: async (req, res, next) => {
    const contributions = await Contribution.find({});
    res.status(200).json({ contributions });
  },

  retrive: async (req, res, next) => {
    const id = req.params.id;
    const contribution = await Contribution.findById(id);
    res.status(200).json({ ...contribution['_doc'] });
  },

  create: async (req, res, next) => {
    const contribution = await new Contribution(req.value.body).save();
    res.status(201).json({ contribution });
  },

  update: async (req, res, next) => {
    const id = req.params.id;
    const updatedContribution = req.value.body;
    const existingContribution = await Contribution.findById(id);
    if (!existingContribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    await existingContribution.update(updatedContribution);
    res.status(200).json({ ...existingContribution['_doc'] });
  },

  delete: async (req, res, next) => {
    const id = req.params.id;
    const existingContribution = await Contribution.findById(id);
    if (!existingContribution)
      return res.status(404).json({ error: `Contribution with id ${id} was not found` });
    await existingContribution.remove();
    res.status(204).json();
  },
}