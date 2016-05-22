var timeago = {};

timeago.since = function(date){
    var seconds = Math.floor(((new Date().getTime()/1000) - (new Date(date).getTime()/1000)));
    interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + " year"+(interval>1?"s":"");

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " month"+(interval>1?"s":"");

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day"+(interval>1?"s":"");

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour"+(interval>1?"s":"");

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " min"+(interval>1?"s":"");

    return Math.floor(seconds) + " sec"+(interval>1?"s":"");
};

module.exports = timeago;