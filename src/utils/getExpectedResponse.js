const getExpectedResponse = (counter) =>{
  if (counter % 3 === 0 && counter % 5 === 0) return 'fizz buzz';
  else if (counter % 3 === 0) return 'fizz';
  else if (counter % 5 === 0) return 'buzz';
  else return counter;
}

module.exports = getExpectedResponse;