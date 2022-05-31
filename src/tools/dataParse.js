const dataParse = (dateString) => {
  let date = dateString.slice(0, dateString.indexOf("T"));
  date = date.split("-").reverse().join(".");

  return date;
};

export default dataParse;
