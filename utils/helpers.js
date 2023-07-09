// helpers.js

const format_date = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

const format_amount = (amount) => {
  // format large numbers with commas
  return parseInt(amount).toLocaleString();
};

const get_emoji = () => {
  const randomNum = Math.random();

  // Return a random emoji
  if (randomNum > 0.7) {
    return `<span for="img" aria-label="lightbulb">💡</span>`;
  } else if (randomNum > 0.4) {
    return `<span for="img" aria-label="laptop">💻</span>`;
  } else {
    return `<span for="img" aria-label="gear">⚙️</span>`;
  }
};

const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB');
  return formattedDate;
};

module.exports = {
  format_date,
  format_amount,
  get_emoji,
  formatDate,
};
