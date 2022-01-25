module.exports = (unformatedTime) => {
    let [hours, minutes] = unformatedTime.split(':');
    hours = parseInt(hours);
    let suffix;
    if(hours < 12){
        suffix = 'AM';
    } else {
        suffix = 'PM';
        hours -= 12;
    }
    return `${hours}:${minutes} ${suffix}`;
}