export default title => title
  .replace('_TAB', '')
  .split('_')
  .map(el => el[0].toUpperCase() + el.substring(1).toLowerCase())
  .join(' ');
