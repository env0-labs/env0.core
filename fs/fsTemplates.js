// fsTemplates.js
import filesystemTemplate from './filesystem.js'; // ⬅ this is already correct, because it's a sibling file

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const fsTemplates = {
  default: () => deepClone(filesystemTemplate)
};

export default fsTemplates;
