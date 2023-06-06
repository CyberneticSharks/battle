class Timer{
    constructor(timeStart, changeBy){
      this.timeStart = timeStart;
      this.changeBy = changeBy;
    }
    displayTimerDown(){
      if(this.timeStart > 0){
        this.timeStart -= this.changeBy;
        document.getElementById("timer").innerHTML = this.timeStart;
      }
    }
    displayTimerUp(){
        this.timeStart += this.changeBy;
        document.getElementById("timer").innerHTML = this.timeStart;
    }
  };