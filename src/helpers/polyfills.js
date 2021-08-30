Date.prototype.getWeekNumber = function(){
    let oneJan = new Date(this.getFullYear(),0,1);
    let numberOfDays = Math.floor((this - oneJan) / (24 * 60 * 60 * 1000));
    return  Math.ceil(( this.getDay() + 1 + numberOfDays) / 7);
};
