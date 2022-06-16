function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const initialState = {
  breakCount: 5,
  longBreakCount: 15,
  sessionCount: 25,
  clockCount: 25 * 60,
  currentTimer: "Session",
  isPlaying: false,
  pomodoroCount: 0 };


const backgroundStyle = [
"linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
"linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.loop = undefined;
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
    this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
    this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
    this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
    this.handleLongBreakDecrease = this.handleLongBreakDecrease.bind(this);
    this.handleLongBreakIncrease = this.handleLongBreakIncrease.bind(this);
    this.setClockCount = this.setClockCount.bind(this);
  }

  handlePlayPause() {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);
      this.setState({
        isPlaying: false });

    } else

    {
      this.loop = setInterval(() => {
        const { clockCount, breakCount, longBreakCount, sessionCount, currentTimer, pomodoroCount } = this.state;
        /*COUNTDOWN PER 1 SECOND*/
        if (clockCount > 0) {
          this.setState(state => ({
            clockCount: state.clockCount - 1 }));

        }

        /*WHEN TIMER REACHES ZERO*/else
          {
            if (currentTimer === "Session") {
              $("body").css("backgroundImage", backgroundStyle[1]);
              this.setState(state => ({
                currentTimer: state.pomodoroCount < 3 ? "Short Break" : "Long Break",
                clockCount: state.pomodoroCount < 3 ? breakCount * 60 : longBreakCount * 60,
                pomodoroCount: state.pomodoroCount + 1 }));

            } else
            {
              $("body").css("backgroundImage", backgroundStyle[0]);
              this.setState(state => ({
                currentTimer: "Session",
                clockCount: sessionCount * 60,
                pomodoroCount: state.pomodoroCount >= 4 ? 0 : state.pomodoroCount }));

            }
            this.audioBeep.play();
          }
      }, 1000);

      this.setState({
        isPlaying: true });

    }
  }

  handleReset() {
    clearInterval(this.loop);
    this.setState(initialState);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    $("body").css("backgroundImage", backgroundStyle[0]);
  }

  handleSessionDecrease() {
    const { sessionCount, currentTimer, isPlaying } = this.state;
    if (sessionCount > 1 && isPlaying == false) {
      this.setState(state => ({
        sessionCount: state.sessionCount - 1 }));

      if (currentTimer === "Session") {
        this.setClockCount((sessionCount - 1) * 60);
      }
    }
  }

  handleSessionIncrease() {
    const { sessionCount, currentTimer, isPlaying } = this.state;
    if (sessionCount < 60 && isPlaying == false) {
      this.setState(state => ({
        sessionCount: state.sessionCount + 1 }));

      if (currentTimer === "Session") {
        this.setClockCount((sessionCount + 1) * 60);
      }
    }
  }

  handleBreakDecrease() {
    const { breakCount, currentTimer, isPlaying } = this.state;
    if (breakCount > 1 && isPlaying == false) {
      this.setState(state => ({
        breakCount: state.breakCount - 1 }));

      if (currentTimer === "Short Break") {
        this.setClockCount((breakCount - 1) * 60);
      }
    }
  }

  handleBreakIncrease() {
    const { breakCount, currentTimer, isPlaying } = this.state;
    if (breakCount < 60 && isPlaying == false) {
      this.setState(state => ({
        breakCount: state.breakCount + 1 }));

      if (currentTimer === "Short Break") {
        this.setClockCount((breakCount + 1) * 60);
      }
    }
  }

  handleLongBreakDecrease() {
    const { longBreakCount, currentTimer, isPlaying } = this.state;
    if (longBreakCount > 1 && isPlaying == false) {
      this.setState(state => ({
        longBreakCount: state.longBreakCount - 1 }));

      if (currentTimer === "Long Break") {
        this.setClockCount((longBreakCount - 1) * 60);
      }
    }
  }

  handleLongBreakIncrease() {
    const { longBreakCount, currentTimer, isPlaying } = this.state;
    if (longBreakCount < 60 && isPlaying == false) {
      this.setState(state => ({
        longBreakCount: state.longBreakCount + 1 }));

      if (currentTimer === "Long Break") {
        this.setClockCount((longBreakCount + 1) * 60);
      }
    }
  }

  setClockCount(n) {
    this.setState({
      clockCount: n });

  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  render() {
    const { breakCount, longBreakCount, sessionCount, clockCount, currentTimer, isPlaying, pomodoroCount } = this.state;
    const sessionProps = {
      setterLabel: "Session Length",
      count: sessionCount,
      setterID: "session-label",
      decrementID: "session-decrement",
      incrementID: "session-increment",
      counterID: "session-length",
      handleDecrease: this.handleSessionDecrease,
      handleIncrease: this.handleSessionIncrease };


    const breakProps = {
      setterLabel: "Short Break Length",
      count: breakCount,
      setterID: "break-label",
      decrementID: "break-decrement",
      incrementID: "break-increment",
      counterID: "break-length",
      handleDecrease: this.handleBreakDecrease,
      handleIncrease: this.handleBreakIncrease };


    const longBreakProps = {
      setterLabel: "Long Break Length",
      count: longBreakCount,
      setterID: "long-break-label",
      decrementID: "long-break-decrement",
      incrementID: "long-break-increment",
      counterID: "long-break-length",
      handleDecrease: this.handleLongBreakDecrease,
      handleIncrease: this.handleLongBreakIncrease };


    return /*#__PURE__*/(
      React.createElement("div", { id: "container", className: "animate__animated animate__zoomInDown" }, /*#__PURE__*/
      React.createElement("div", { id: "header" }, /*#__PURE__*/
      React.createElement("h1", null, "25 + 5 Clock"), /*#__PURE__*/
      React.createElement("p", null, "Coded by Jonathan")), /*#__PURE__*/

      React.createElement("div", { id: "set-container" }, /*#__PURE__*/
      React.createElement(SetTimer, sessionProps), /*#__PURE__*/
      React.createElement(SetTimer, breakProps), /*#__PURE__*/
      React.createElement(SetTimer, longBreakProps)), /*#__PURE__*/

      React.createElement(Clock, { clockLabel: currentTimer, clockCount: clockCount, handlePlayPause: this.handlePlayPause, handleReset: this.handleReset, isPlaying: isPlaying }), /*#__PURE__*/
      React.createElement(PomodoroCounter, { pomodoroCount: pomodoroCount }), /*#__PURE__*/
      React.createElement("audio", { id: "beep", preload: "auto", ref: audio => {
          this.audioBeep = audio;
        }, src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}


class SetTimer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { setterLabel, count, setterID, decrementID, incrementID, counterID, handleIncrease, handleDecrease } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", { className: "set-timer" }, /*#__PURE__*/
      React.createElement("h2", { className: "setter-label", id: setterID }, setterLabel), /*#__PURE__*/
      React.createElement("div", { className: "buttons-container" }, /*#__PURE__*/
      React.createElement("button", { type: "button", className: "btn btn-primary", id: decrementID, onClick: handleDecrease }, /*#__PURE__*/React.createElement("i", { class: "fas fa-minus" })), /*#__PURE__*/
      React.createElement("span", { id: counterID, className: "counter-length" }, count), /*#__PURE__*/
      React.createElement("button", { type: "button", className: "btn btn-primary", id: incrementID, onClick: handleIncrease }, /*#__PURE__*/React.createElement("i", { class: "fas fa-plus" })))));



  }}


class Clock extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "convertToTime",


    count => {
      let minutes = Math.floor(count / 60);
      let seconds = count % 60;
      let time = "";
      time = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
      time = seconds < 10 ? time.concat(`0${seconds}`) : time.concat(`${seconds}`);
      return time;
    });}

  render() {
    const { clockLabel, clockCount, handlePlayPause, handleReset, isPlaying } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", { id: "clock-container" }, /*#__PURE__*/
      React.createElement("h2", { id: "timer-label" }, clockLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.convertToTime(clockCount)), /*#__PURE__*/
      React.createElement("div", { className: "buttons-container" }, /*#__PURE__*/
      React.createElement("button", { type: "button", className: "btn btn-primary", id: "start_stop", onClick: handlePlayPause }, /*#__PURE__*/React.createElement("i", { className: `fas fa-${isPlaying ? "pause" : "play"}` })), /*#__PURE__*/
      React.createElement("button", { type: "button", className: "btn btn-primary", id: "reset", onClick: handleReset }, /*#__PURE__*/React.createElement("i", { className: "fas fa-redo" })))));



  }}


class PomodoroCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pomodoroCount } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", { id: "pomodoro-count" }, "Pomodoro Count: ",
      pomodoroCount, " ", String.fromCharCode(160),

      [...Array(pomodoroCount)].map((tomato, index) => /*#__PURE__*/React.createElement(TomatoImage, { key: index }))));



  }}


const TomatoImage = () => {
  return /*#__PURE__*/(
    React.createElement("img", { className: "tomato-pic", src: "https://pngimg.com/uploads/tomato/tomato_PNG12592.png", alt: "tomato picture" }));

};


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));