const monthTable = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October', 
  '11': 'November',
  '12': 'December'
}

const dateFormatter = date => {
  if (!date) return 'Release Date Not Available'; 
  const [year, month, day] = date.split('-');
  return `${day} ${monthTable[month]} ${year}`;
}

export default dateFormatter;