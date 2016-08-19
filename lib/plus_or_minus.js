function plusOrMinus(baseNumber, spreadNumber, questionedNumber) {
  let possibleValues = [baseNumber];

  for (let i = spreadNumber + baseNumber; i > baseNumber; i-- ) { possibleValues.push(i); }
  for (let i = baseNumber - spreadNumber; i < baseNumber; i++ ) { possibleValues.push(i); }

  return possibleValues;
}

module.exports = plusOrMinus;
