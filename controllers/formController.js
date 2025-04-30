//handleing error
const handleError = require('../utils/errorHandler');

//Temporary storage (in-memory)
const submissions = require('../models/submissionModel');

const validNumber = /^(?:\+91|91)?[6-9]\d{9}$/;

exports.getForm = (req, res) => {
  res.render('form', { error: null });
};

exports.submitForm = (req, res) => {
  const { first, last, email, phone } = req.body;
  const age = Number(req.body.age);

  //Server-side validation {
  if (!first || !last || !email || !age || !phone) {
    return handleError(res, 'All fields are required to process');
  }

  if (isNaN(age) || age < 1 || age > 120) {
    return handleError(res, 'Age must be a number between 1 - 120');
  }

  if (!validNumber.test(phone)) {
    return handleError(
      res,
      'phone number must have +91 or 91 prefix, followed by 10 digits',
    );
  }

  //checking of data if existed
  let submission = submissions.find((s) => s.email || s.phone);

  //Store in temporary array
  if (!submission) {
    submission = { first, last, email, age, phone };
    submissions.push(submission);
  }

  // Redirecting to result
  return res.redirect(`/result?email=${encodeURIComponent(email)}`);
};

exports.getResult = (req, res) => {
  const { email } = req.query;

  const submission = submissions.find((s) => s.email);

  if (!submission) {
    return res.redirect('/');
  }

  const { first, last, age, phone } = submission;

  //Render result
  res.render('result', { first, last, email, age, phone, submissions });
};
