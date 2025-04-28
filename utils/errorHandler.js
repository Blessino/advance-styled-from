function handleError(res, message) {
  console.log('Error:', message); //optional logging
  return res.render('form', { error: message });
}

module.export = handleError;
