import Message from '../models/messageModel';
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: process.env.admin_email_user,
    pass: process.env.admin_email_pass
  }
});

const sendMail = async (contactMessage) => {
  const { name, email, phone, subject, message, type } = contactMessage;

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

export async function list(req, res, next) {
  const messages = await Message.find({}, null, { sort: { _id: -1 } });
  res.status(200).json([...messages]);
}

export async function create(req, res, next) {
  const message = await new Message(req.value.body).save();
  // await sendMail(req.value.body);
  res.status(201).json({ ...message['_doc'] });
}

export async function remove(req, res, next) {
  const id = req.params.id;
  Message.findByIdAndRemove(id, (error, message) => {
    if (error)
      return res.status(404).json({ error: error.message });
    else if (!message)
      return res.status(404).json({ error: `Message with id ${id} was not found` });
    else
      return res.status(200).json({...message['_doc']});
  });
}