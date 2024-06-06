const formatIndex = (value, digits) => {
    return String(value).padStart(digits, '0');
}

const removeZeros = (value) => { //if i want to remove proceding zeros
    return parseInt(value, 10);
}

module.exports = {
    formatIndex,
    removeZeros
}