const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Note: Months are zero-based
const year = currentDate.getFullYear();

// Ensure the day and month have leading zeros if needed
const formattedDay = day < 10 ? `0${day}` : day;
const formattedMonth = month < 10 ? `0${month}` : month;

const formattedCurrDate = `${formattedDay}/${formattedMonth}/${year}`;

module.exports = {
    formattedCurrDate
}