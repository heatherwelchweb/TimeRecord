import React, { Component } from 'react';
import { formatElapsedTime, appendZero } from './utils/TimeFormat';
import './Stopwatch.css';


class Stopwatch extends Component {

  timingStates = {
    INITIAL:0,
    TIMING:1,
    STOPPED:2
  };

  constructor(props){
    super(props);
    this.state = {
      startTime: 0,
      arrivedAt: [],
      currentTime: 0,
      timingState: this.timingStates.INITIAL,
      stoppedTime:0,
    }


  }

  updateCurrentTime = () => {
    if(this.state.timingState === this.timingStates.TIMING){
      this.setState({currentTime: Date.now() });

    }
  }

  resetTiming = () => {
    this.setState({arrivedAt:[]});
    this.setState({timingState:this.timingStates.INITIAL});
    this.setState({currentTime: 0, startTime: 0, stoppedTime:0});
  }

  resumeTiming = () => {
    this.setState({timingState:this.timingStates.TIMING, startTime: this.state.startTime+Date.now()-this.state.stoppedTime});
  }

  stopTiming = () => {
    this.setState({timingState:this.timingStates.STOPPED, stoppedTime:Date.now()})
  }

  startTiming = () => {
    this.setState({startTime:Date.now()})
    this.setState({timingState:this.timingStates.TIMING})
    setInterval(this.updateCurrentTime,10);
  }

  lapTiming = () => {

    this.setState({arrivedAt: [...this.state.arrivedAt, Date.now() - this.state.startTime]})
    console.log(this.state.arrivedAt.length);
  }
  initialRender = () => {
    return <button onClick = {this.startTiming}>Start</button>
  }

  tableRender = () => {

    if(this.state.arrivedAt.length>0){
      let lapList = [];
      let lastArrived = 0;
      for(let i = this.state.arrivedAt.length - 1 ; i >= 0 ; i--){
        if(i>0) lastArrived = this.state.arrivedAt[i-1];
        if (i ===0 ) lastArrived = 0;
        lapList.push(
          <tr>
            <td>{appendZero(i)}</td>
            <td>{formatElapsedTime(this.state.arrivedAt[i]-lastArrived)}</td>
            <td>{formatElapsedTime(this.state.arrivedAt[i])}</td>
          </tr>)
      }
      return <center><div><table border='1'><tbody>{lapList}</tbody></table></div><br/></center>
    }
    return '';
  }
  timingRender = () => {

    return(
      <div>
        {this.tableRender()}
        <button onClick = {this.stopTiming}>Stop</button> <button onClick={this.lapTiming}>Lap</button>
      </div>
        )
  }
  lapTime = () => {
    let length = this.state.arrivedAt.length;
    switch(this.state.timingState){

      case this.timingStates.INITIAL:
        return 0;
      case this.timingStates.TIMING:
        return this.state.arrivedAt.length === 0 ? Date.now() - this.state.startTime : Date.now() - this.state.arrivedAt[length-1] - this.state.startTime;
      case this.timingStates.STOPPED:
        return this.state.arrivedAt.length === 0 ? this.state.stoppedTime - this.state.startTime : this.state.stoppedTime - this.state.arrivedAt[length-1] - this.state.startTime;
      default:
        return 0;
    }

  }

  stoppedRender = () => {
    return (
      <div>
        {this.tableRender()}
        <div>
          <button onClick = {this.resumeTiming}>Resume</button>
          <button onClick={this.resetTiming}>Reset</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <p className="time-big">{formatElapsedTime(this.state.currentTime - this.state.startTime)}</p>
        <p className="time-small">{formatElapsedTime(this.lapTime())}</p>
        {
          this.state.timingState === this.timingStates.INITIAL ? this.initialRender() :
          this.state.timingState === this.timingStates.TIMING ? this.timingRender() :
          this.state.timingState === this.timingStates.STOPPED ? this.stoppedRender() : ""
        }
      </div>
    );
  }

}

export default Stopwatch;
