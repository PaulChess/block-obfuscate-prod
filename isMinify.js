const fs = require('fs');
 
function isMinified (text) {
  const kMaxNonMinifiedLength = 500;
  let linesToCheck = 10;
  let lastPosition = 0;
  do {
    let eolIndex = text.indexOf('\n', lastPosition);
    if (eolIndex < 0) {
      eolIndex = text.length;
    }
    if (eolIndex - lastPosition > kMaxNonMinifiedLength && text.substr(lastPosition, 3) !== '//#') {
      return true;
    }
    lastPosition = eolIndex + 1;
  } while (--linesToCheck >= 0 && lastPosition < text.length);
 
  // Check the end of the text as well
  linesToCheck = 10;
  lastPosition = text.length;
  do {
    let eolIndex = text.lastIndexOf('\n', lastPosition);
    if (eolIndex < 0) {
      eolIndex = 0;
    }
    if (lastPosition - eolIndex > kMaxNonMinifiedLength && text.substr(lastPosition, 3) !== '//#') {
      return true;
    }
    lastPosition = eolIndex - 1;
  } while (--linesToCheck >= 0 && lastPosition > 0);
  return false;
};