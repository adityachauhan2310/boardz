export default (date, longDateFormat = 'longDateTime', fullDateFormat = 'fullDateTime') => {
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  return year === currentYear ? longDateFormat : fullDateFormat;
};
