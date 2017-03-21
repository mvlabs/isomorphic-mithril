// MISC VARS
// ----------------------------------------------------------------------------------------------------

const xhrConfig = (xhr) => {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
};

const dateFormatStandard = 'YYYY-MM-DD';

module.exports = {
    xhrConfig,
    dateFormatStandard
};