export function checkUndefinedFields(obj:any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'undefined') {
        return false;
      }
    }
  }
  return true;
}