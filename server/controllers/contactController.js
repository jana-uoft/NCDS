import Contact from '../models/contactModel';
const fs = require('fs');
var nodemailer = require('nodemailer');

const config = JSON.parse(fs.readFileSync('./.env.json', 'utf8'));
var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  // secure: true,
  auth: {
    user: config.admin_email_user,
    pass: config.admin_email_pass
  }
});

const sendMail = async (contact) => {
  const { name, email, phone, subject, message, type } = contact;

  let html = '<h1> Message from NainativuCDS.org </h1>';
  html += '<p>' + message + '</p>';
  if (name) html += '<br/><br/><p> Name: ' + name + '</p>';
  if (email) html += '<br/><p> Email: ' + email + '</p>';
  if (phone) html += '<br/><p> Contact No: ' + phone + '</p>';
  var mailOptions = {
    from: email,
    to: 'admin@nainativucds.org',
    subject: `RE: ${type} -> ${subject}`,
    html
  };
  const result = await transporter.sendMail(mailOptions)
  console.log(result);
}

export async function contactSubmissions(req, res, next) {
  const contacts = await Contact.find({type: 'Contact'}, null, { sort: { _id: -1 } });
  res.status(200).json([...contacts]);
}

export async function donateSubmissions(req, res, next) {
  const contacts = await Contact.find({type: 'Donate'}, null, { sort: { _id: -1 } });
  res.status(200).json([...contacts]);
}

export async function create(req, res, next) {
  const contact = await new Contact(req.value.body).save();
  // await sendMail(req.value.body);
  res.status(201).json({ ...contact['_doc'] });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Contact.findByIdAndRemove(id, (error, contact) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!contact)
      return res.status(404).json({ error: `Contact with id ${id} was not found` });
    else
      return res.status(200).json({...contact['_doc']});
  });
}