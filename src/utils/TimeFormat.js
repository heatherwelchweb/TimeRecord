export const appendZero = (num) => {
  return ("0" + num).slice(-2);
}
export const formatElapsedTime = (miliSeconds) => {
  let elapsedTimeInMiliSeconds = +miliSeconds;
  let elapsedTimeInSeconds;
  let fraction;
  let hour, min, sec;
  if(isNaN(elapsedTimeInMiliSeconds)){
    return "00:00:00";
  }
  elapsedTimeInSeconds = Math.floor(elapsedTimeInMiliSeconds/1000);
  fraction = Math.floor(elapsedTimeInMiliSeconds/10)%100;
  sec = elapsedTimeInSeconds%60;
  let _min = Math.floor(elapsedTimeInSeconds/60);
  min = _min%60;
  hour = Math.floor(_min/60);

  if (hour === 0)
    return  appendZero(min) + ":" + appendZero(sec) + "." + appendZero(fraction);
  return appendZero(hour) + ":" + appendZero(min) + ":" + appendZero(sec)+ "." + appendZero(fraction);
}
