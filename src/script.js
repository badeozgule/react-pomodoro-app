const buttonClick = new Audio("https://cdn.freesound.org/previews/553/553362_11409686-lq.mp3");

const lastSeconds = new Audio("https://cdn.freesound.org/previews/485/485406_6142149-lq.mp3");

const bellSound = new Audio("https://cdn.freesound.org/previews/328/328823_4877562-lq.mp3");

const breakDone = new Audio("https://cdn.freesound.org/previews/242/242501_4414128-lq.mp3");

const sessionDone= new Audio("https://cdn.freesound.org/previews/322/322930_5260872-lq.mp3");

const coolSound = new Audio("https://cdn.freesound.org/previews/619/619834_7614679-lq.mp3");

const coolSound2 = new Audio("https://cdn.freesound.org/previews/619/619837_7614679-lq.mp3");

const popupSound = new Audio("https://cdn.freesound.org/previews/364/364657_6687700-lq.mp3");

const dialogTextList = [
  {
    "type":"skip",
    "title":"Skip session?",
    "desc":"You are skipping without completing the session.",
  },
  {
    "type":"stop",
    "title":"Are you sure?",
    "desc":"You are in the middle of a focus session, would you like to finish this session?",
  },{
    "type":"discard",
    "title":"Discard changes?",
    "desc":"Are you sure you wish to discard the current changes? ",
  }
];

class GithubCorner extends React.Component {
  render() {
    const {
      url = '#',
    } = this.props;

    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="github-corner"
        aria-label="View source on GitHub"
      >
        <svg width="80" height="80" viewBox="0 0 250 250" ariaHidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: "130px 106px"}} class="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
        </svg>
      </a>
      
    );
  }
}





class Dialog extends React.Component {
  constructor(props) {
    super(props);
  } 
  
  handleDialogCallback = (type) => {
    this.props.handleDialogCallback(false);
    this.props.handleDialogReturnResult(type);
  }
 
  render() {
    const dialog = dialogTextList.filter(dialog => dialog.type === this.props.dialogType)[0];   

    return (
      <dialog open={this.props.mode}>
        <div className="content">
          <h3>{dialog && dialog.title}</h3>
          <p>{dialog && dialog.desc}</p>
          <div class="btn-group">
            <button 
              class="secondary" 
              onClick={()=>this.handleDialogCallback("back")}>
              back
            </button>
            <button 
              id={dialog && dialog.type === "stop" ? "reset" : null}
              class="primary" 
              onClick={()=>this.handleDialogCallback(dialog && dialog.type)}>
              {dialog && dialog.type}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
}


class SessionContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  bulletItems = () => {
    const {sessionFocusCounter, selectedActiveMode} = this.props;
    const arr = [];
    // for (let i = 0; i < sessionFocusCounter % 4; i++) {
    //   arr.push(
    //     <div className={`session s ${selectedActiveMode === "pomodoro" ? "show" : null}`}></div>
    //   );
    // }
    for (let i = 0; i < 4; i++) {
      arr.push(
        <div className="session s show"></div>
      );
    }
    return arr;
  }
  
  
  bItems = (focusCounter) => {
     const {remainingTime, animationDuration, selectedActiveMode, sessionFocusCounter} = this.props;
    const item = 
          remainingTime === animationDuration ? "s" : 
          remainingTime > animationDuration/4*3 ? "s0" : 
          remainingTime > animationDuration/4*2 ? "s1" : 
          remainingTime > animationDuration/4 ? "s2" : 
          0 < remainingTime ? "s3" : "s4";
    const arr = [];
    const count = focusCounter % 4;
    const rest = 4 - count - 1;
        // const rest = 4 - count - 1;
    for (let i = 0; i <= count; i++) {
      if(i !== count) {
        arr.push(<div className="session s4 show"></div>);
      } else {
        if (selectedActiveMode === "pomodoro") {
          arr.push(<div className={`session ${item} show`}></div>);          
        } else if (selectedActiveMode !== "pomodoro" && focusCounter !== 0 && focusCounter % 4 === 0) {
          arr.push(<div className="session s4 show"></div>);          
        } 
        else {
          arr.push(<div className="session s show"></div>);
        }
      }
    }
    for (let i = 1; i <= rest; i++) {
      if (selectedActiveMode !== "pomodoro" && focusCounter !== 0 && focusCounter % 4 === 0) {
        arr.push(<div className="session s4 show"></div>);          
      } else {
        arr.push(<div className="session s show"></div>);        
      }

      
    }
    return arr;
      
  }
  
  render() {
    const {sessionFocusCounter} = this.props;
   
    return(
      
      <div className="session-container">
        {this.bItems(sessionFocusCounter)}
      </div>
                                             
    );
  }
} 

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: null,
      second: null,
      remainingTime: null,
      spendingTimeCount: 0,
      permanentValue: 60, //second
      animationDuration: null,
      isTimerRunning: false,
      isTimerOnProgress: false,
      sessionFocusCounter: 0,
      sessionShortBreakCounter: 0,
      sessionLongBreakCounter: 0,
      timerStatusButtonTitle: "START",
      didIPausedTimer: false,
    }
    this.intervalTimer = null;
    this.nextStepTimeout = null;
    this.lastSecondsSoundInterval = null;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  
  componentDidMount() {
    this.setTimer();
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillMount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  
  
  
  
  componentDidUpdate(prevProps, prevState) { //////////////
    const {sessionFocusCounter} = this.state;
    
    if ((this.props.timePomodoro !== prevProps.timePomodoro) && this.props.selectedActiveMode === "pomodoro") {
      this.setState({
        minute: this.props.timePomodoro
      })
    } else if ((this.props.timeShort !== prevProps.timeShort) && this.props.selectedActiveMode === "short break") {
      this.setState({
        minute: this.props.timeShort
      })
    } else if ((this.props.timeLong !== prevProps.timeLong) && this.props.selectedActiveMode === "long break") {
      this.setState({
        minute: this.props.timeLong
      })
    }
    
    if (this.props.dialogReturn === "stop" && this.props.dialogReturn !== prevProps.dialogReturn) {
      this.killTimerProgress();
      if(this.props.selectedActiveMode !== "pomodoro") {
        this.nextStepTimeout = setTimeout(()=> {
          this.props.handleSelectedActiveMode("pomodoro") //////////////
        }, 500);   
      } 
    }
    else if (this.props.dialogReturn === "skip" && this.props.dialogReturn !== prevProps.dialogReturn) {
      this.killTimerProgress();
      this.nextStepTimeout = 
        setTimeout(()=>{
        this.props.handleSelectedActiveMode("skip");  
        this.toggleTimerStart("start");
      }, 500);
    }
    else if (this.props.dialogReturn === "back" && this.props.dialogReturn !== prevProps.dialogReturn) {
      !this.state.didIPausedTimer && this.toggleTimerStart("resume");
      this.props.handleDialogReturnResult(null);
    }
    
    if(prevProps.selectedActiveMode !== this.props.selectedActiveMode) {
      this.setTimer();
    }
    if(prevState.isTimerRunning !== this.state.isTimerRunning) {
      // let circleAnim = document.getElementsByClassName("colored")[0];
      // circleAnim.classList.remove("start"); 
      if(this.state.isTimerRunning) {
        // circleAnim.style.animationName = "timerStart"
        // circleAnim.style.animationDuration = this.state.animationDuration + "s";
        // circleAnim.style.animationPlayState = "running";
        // circleAnim.style.animationDirection = "";
        // circleAnim.classList.add("start"); 
        this.setState({
          isTimerOnProgress: true,
          spendingTimeCount: 0,
        });
        
      }
      else{
        // circleAnim.style.animationPlayState = "paused";
      }
    }
  }
  
  handleKeyPress = (event) => {
    if (!this.props.isDialogOpen) {
      if (event.keyCode === 32 && event.type === "keydown") {
        event.preventDefault();
        event.target.blur();
        if(this.state.timerStatusButtonTitle === "PAUSE") {
          this.toggleTimerStart("pause");
        } else if (this.state.timerStatusButtonTitle === "RESUME"){
          this.toggleTimerStart("resume");
        } else if (this.state.timerStatusButtonTitle === "START"){
          this.toggleTimerStart("start");
        }
      } else if (event.keyCode === 39 && event.type === "keydown" && this.state.isTimerOnProgress) {
        event.preventDefault();
        event.target.blur();
        this.progressButtonOnClick("skip");
      } else if (event.keyCode === 39 && event.type === "keydown" && !this.state.isTimerOnProgress) {
        event.preventDefault();
        event.target.blur();
        if (this.props.selectedActiveMode === "pomodoro") {
          this.props.handleSelectedActiveMode("short break");
        } else if (this.props.selectedActiveMode === "short break") {
          this.props.handleSelectedActiveMode("long break");
        } 
      } else if (event.keyCode === 37 && event.type === "keydown" && !this.state.isTimerOnProgress) {
        event.preventDefault();
        event.target.blur();
        if (this.props.selectedActiveMode === "long break") {
          this.props.handleSelectedActiveMode("short break");
        } else if (this.props.selectedActiveMode === "short break") {
          this.props.handleSelectedActiveMode("pomodoro");
        }
      } else if (event.keyCode === 27 && event.type === "keydown" && this.state.isTimerOnProgress) { 
        event.preventDefault();
        event.target.blur();
        this.progressButtonOnClick("stop");
      }
    } else {
      if (event.keyCode === 13 && event.type === "keydown") {
        event.preventDefault();
        event.target.blur();
        this.props.handleDialogCallback(false); 
        this.props.handleDialogReturnResult(this.props.dialogType);
      }
      else if (event.keyCode === 27 && event.type === "keydown") { 
        event.preventDefault();
        event.target.blur();
        this.props.handleDialogCallback(false);
        this.props.handleDialogReturnResult("back");
      }
    }
    
  } 
  
  animationCircleComplete = () => {
    let circleAnim = document.getElementsByClassName("colored")[0];
    circleAnim.style.transitionDuration = ".5s";
    // circleAnim.style.animationName = "timerComplete";
    // circleAnim.style.animationPlayState = "running";
    // circleAnim.style.animationDuration =  ".5s";
    circleAnim.style.strokeDashoffset = (95.625 / (this.state.remainingTime + this.state.spendingTimeCount) * this.state.spendingTimeCount) + "em";
   
  }
  
  setTimer = () => {
    const {permanentValue} = this.state;
    const {timePomodoro, timeShort, timeLong, selectedActiveMode}= this.props;
    const remainingTime = (selectedActiveMode === "pomodoro" ? timePomodoro : selectedActiveMode === "short break" ? timeShort : timeLong) *  this.state.permanentValue;
    this.animationCircleComplete();
    this.clear();
    
    this.setState({
      remainingTime: remainingTime,
      animationDuration: remainingTime,
      minute: Math.floor(remainingTime / permanentValue),
      second: remainingTime % permanentValue,
      timerStatusButtonTitle: "START",
      isTimerOnProgress: false,
      spendingTimeCount: 0,
    });
  }
  
  killTimerProgress = () => {
    this.toggleTimerStart("stop");
    // this.animationCircleComplete();
    this.clear();
    this.setTimer();
    this.props.handleDialogReturnResult(null);
    if (this.props.dialogReturn !== "stop") {
      if (this.state.sessionFocusCounter !== 0 || this.state.sessionShortBreakCounter !== 0 || this.state.sessionLongBreakCounter !== 0) {
        this.nextStepTimeout = 
          setTimeout(()=>{
          this.props.handleSelectedActiveMode("skip"); 
          this.toggleTimerStart("start");
        }, 500);
        this.props.selectedActiveMode === "short break" ? 
         this.lastSecondsSoundInterval = setTimeout(() => {
           breakDone.currentTime = 0;
           breakDone.play();
         }, 1000) : this.props.selectedActiveMode === "pomodoro" ?
          this.lastSecondsSoundInterval = setTimeout(() => {
          sessionDone.currentTime = 0;
          sessionDone.play();
         }, 1000) : this.lastSecondsSoundInterval = setTimeout(() => {
          bellSound.currentTime = 0;
          bellSound.play();
         }, 1000);
      }
    }   
  }
  
  
  clear = () => {
   clearInterval(this.intervalTimer);
  }
  
  toggleTimerStart = (type) => {
    if (type && type === "stop") {
      if(this.props.dialogReturn === "stop") {
        this.setState({
          sessionShortBreakCounter: 0,
          sessionLongBreakCounter: 0,
          sessionFocusCounter: 0,
        }, ()=> {
          this.props.handleFocusSessionCounter(this.state.sessionFocusCounter);
          this.animationCircleComplete();
        });  
      }
      this.setState({
        isTimerRunning: false,
        isTimerOnProgress: false,
        timerStatusButtonTitle: "START",
      }, () => {
        this.clear();
        this.props.handleIsTimerRunning(false);
        this.props.handleIsTimerOnProgress(false);
      });
    }
    else if (type && type === "pause") {
      this.setState({
        isTimerRunning: false,
        isTimerOnProgress: true,
        
        timerStatusButtonTitle: "RESUME",
      }, () => {
        this.clear();
        this.props.handleIsTimerRunning(false);
        this.props.handleIsTimerOnProgress(true);
      });
    }
    else if (type && type === "resume") {
      this.setState({
        isTimerRunning: true,
        isTimerOnProgress: true,
        
        timerStatusButtonTitle: "PAUSE",
      }, ()=> {
        this.timer();
        this.props.handleIsTimerRunning(true);
        this.props.handleIsTimerOnProgress(true);
      })
    }
    else if (type && type === "start") {
      
      this.setState({
        isTimerRunning: true,
        isTimerOnProgress: true,
        
        timerStatusButtonTitle: "PAUSE",
      }, ()=> {
        this.timer();
        this.props.handleIsTimerRunning(true);
        this.props.handleIsTimerOnProgress(true);
      })
    }
    
  }
  
  sessionCounter = (type) => {
    if(type === "short break") {
      this.setState({
        sessionShortBreakCounter: this.state.sessionShortBreakCounter + 1
      });
    } else if (type === "long break") {
      this.setState({
        sessionLongBreakCounter: this.state.sessionLongBreakCounter + 1
      });
    } else if (type === "pomodoro") {
      this.setState({
        sessionFocusCounter: this.state.sessionFocusCounter + 1
      }, () => {
        this.props.handleFocusSessionCounter(this.state.sessionFocusCounter);
      });
    }
  }
  
  timer = () => {    
    
    let circleAnim = document.getElementsByClassName("colored")[0];
    circleAnim.style.transitionDuration =  "1s";
     this.setState({
       timerStatusButtonTitle: "PAUSE"
     });
    clearTimeout(this.nextStepTimeout);
    this.nextStepTimeout = null;
   
    this.intervalTimer = setInterval(() => {
      if (this.state.remainingTime === 10) {
        lastSeconds.currentTime = 0;
        lastSeconds.play();
      } 

      
     
      if (this.state.remainingTime === 0) {
        this.sessionCounter(this.props.selectedActiveMode);
        this.killTimerProgress();
      } else {
         this.setState((prevState) => ({
          remainingTime: prevState.remainingTime - 1,
          spendingTimeCount: prevState.spendingTimeCount + 1
        }),() => {
          this.setState(({remainingTime, permanentValue}) => ({
            minute: Math.floor(remainingTime / permanentValue),
            second: remainingTime % permanentValue,          
          }));
           circleAnim.style.strokeDashoffset = (95.625 / this.state.animationDuration * (this.state.animationDuration - this.state.remainingTime)) + "em";
        });
      }
    }, 1000);
  }
  
  
  progressButtonOnClick = (type) => {
    if(this.state.timerStatusButtonTitle === "PAUSE") {
      this.setState({didIPausedTimer: false});
      this.toggleTimerStart("pause");
    } else if (this.state.timerStatusButtonTitle === "RESUME"){
      this.setState({didIPausedTimer: true});
    }
    this.props.handleDialogCallback(true, type);
  }
  
  
  render() {
    const {timePomodoro, timeShort, timeLong, selectedActiveMode}= this.props;
    const {isTimerRunning, minute, second, remainingTime, isTimerOnProgress, timerStatusButtonTitle} = this.state;
    const time = selectedActiveMode === "pomodoro" ? timePomodoro : selectedActiveMode === "short break" ? timeShort : timeLong;
   
    const mn = minute <= 9 ? "0" + minute : minute;
    const sc = second <= 9 ? "0" + second : second;
    
    // const ttt = new Date(mn * 60000).toISOString().substr(14, 5);

    
    return (
      <section align="center">

        <div className={`timer ${isTimerRunning ? "start" : "pause"}`}>
          <svg xmIns="http: //www.w.org/2000/svg" version="1.1">
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" />
                <stop offset="100%" />
              </linearGradient> 
            </defs>
            <circle className="bg" stroke-linecap="round" />
            <circle 
              ref={(circle) => (this.circleElement = circle)}
              className="colored" stroke-linecap="round"/>
          </svg>
          <div className="inner-circle">
            <div>
              {/*<p>{`${this.state.sessionShortBreakCounter}, ${this.state.sessionLongBreakCounter}, ${this.state.sessionFocusCounter}`}</p>*/}
              <SessionContainer
                sessionFocusCounter={this.state.sessionFocusCounter}
                animationDuration={this.state.animationDuration}
                remainingTime={this.state.remainingTime}
                selectedActiveMode={selectedActiveMode}
              />
              <p className="clock" id="time-left" style={{"--color": "red"}}>
                <span>{mn}</span>
                <span>:</span>
                <span>{sc}</span>
              </p>
              <a 
                id="start_stop"
                href='javascript:void(0)' 
                onClick={() => {
                  !isTimerOnProgress ? 
                    (this.toggleTimerStart("start"), 
                     buttonClick.currentTime = 0,
                     buttonClick.play()) : 
                  isTimerRunning ? 
                    (this.toggleTimerStart("pause"), 
                     buttonClick.currentTime = 0,
                     buttonClick.play()) : 
                  isTimerOnProgress && !isTimerRunning ? 
                    (this.toggleTimerStart("resume"), 
                     buttonClick.currentTime = 0,
                     buttonClick.play()) : 
                  null}}>
                {timerStatusButtonTitle}
              </a>
              {isTimerRunning || isTimerOnProgress ?  
                <div className="awe-container">
                <a 
                  id="reset"
                  href='javascript:void(0)' 
                  onClick={()=>{this.progressButtonOnClick("stop")}}><i class="fa-solid fa-stop"></i></a>
                <a href='javascript:void(0)' onClick={()=>{this.progressButtonOnClick("skip")}}><i class="fa-solid fa-angles-right"></i></a>
              </div>
               : null}
              
            </div>
          </div>
        </div>
      </section>
    );
  }
}

class SlideButtonItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: null,
      top: null,
      width: null,
      slideItemSelection: "pomodoro",
      isResizeActive: false,
    }
    
    this.slideRef = this.props.item.map(() => React.createRef());
    // this.resizeTimeout = undefined;
    // this.resizeListener = this.resizeListener.bind(this);
  }
  
  componentDidMount(props) {
    this.switchMode(this.props.activeMode, 0, "switchMode");
    // window.addEventListener('resize', this.resizeListener);
  }

  
//   componentWillUnmount() {
//     window.removeEventListener('resize', this.resizeListener);
//   }
  
//   resizeListener = () => {
//     const {item, activeMode, isResizeActive} = this.props;
//     this.switchMode(activeMode, item.indexOf(activeMode), "resize");

//     this.setState({ isResizeActive: true }, () => {
//       this.switchMode(activeMode, item.indexOf(activeMode), "resize");
//     });
//     clearTimeout(this.resizeTimeout);
//     this.resizeTimeout = setTimeout(() => {
//       this.setState({ isResizeActive: false }, () => {
//         this.switchMode(activeMode, item.indexOf(activeMode), "resize");
//       });
//     }, 250);
//   }
  
  componentDidUpdate(prevProps, prevState) {
    const {item, activeMode, isResizeActive} = this.props;
   
    
    if (activeMode !== prevProps.activeMode) {
      this.switchMode(activeMode, item.indexOf(activeMode), "switchMode");
    }   
       
    if (isResizeActive !== prevProps.isResizeActive) {
      this.switchMode(activeMode, item.indexOf(activeMode), "resize");
    }
    
    if (this.props.dialogReturn === "back" && this.props.dialogReturn !== prevProps.dialogReturn) {
      this.switchMode(prevProps.activeMode, item.indexOf(prevProps.activeMode), "dialogReturnBack");
    }   
  } 
  
  
   switchMode = (mode,i, type) => {
    const top = this.slideRef[i].current.offsetTop;
    const width = this.slideRef[i].current.offsetWidth;
    const translateX = i === 0 ? "translateX(calc(-100% - 0.5rem)" : i === 2 ? "translateX(calc(100% + 0.5rem))" : "translateX(0)";
    if (type === "dialogReturnBack") {

      this.setState({
        top: top,
        width: width,
        slideItemSelection: mode,
      }, ()=>{               
        this.props.handleSelectedButtonTopVal(top);
        this.props.handleSelectedButtonWidthVal(width);
        this.props.handleSelectedButtonTranslateX(translateX);
        this.props.handleChildSlideItemSelection(this.state.slideItemSelection);
        this.props.handleDialogReturnResult(null);
      });
    }
    else if (type === "switchMode") {

      this.setState({
        top: top,
        width: width,
        slideItemSelection: mode,
      }, ()=>{
        this.props.handleSelectedButtonTopVal(top); 
        this.props.handleSelectedButtonWidthVal(width);
        this.props.handleSelectedButtonTranslateX(translateX);
        this.props.handleChildSlideItemSelection(this.state.slideItemSelection);  
        this.props.handleSelectedMode(mode);
      });
    } else if (type === "resize") {
      this.setState({
        top: top,
        width: width,
        slideItemSelection: mode,
      }, ()=>{
        this.props.handleSelectedButtonTopVal(top);
        this.props.handleSelectedButtonWidthVal(width);
        this.props.handleSelectedButtonTranslateX(translateX);
        this.props.handleChildSlideItemSelection(this.state.slideItemSelection);
      });
    }
  }
  render()  {
    const {activeMode, item, slideRef} = this.props;
    return (
      <>
        {item.map((obj, i) => (
          <a 
            onClick={() => this.switchMode(obj,i,"switchMode")}
            className={this.state.slideItemSelection === obj ? "bt-active" : null}
            ref={this.slideRef[i]}
            data-content={obj}
            ></a>
         ))}
        </>
    );
  }
}
class SlideButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      isSettingsOpen: false, 
      activeMode: this.props.activeMode,
      top: 0,
      width: 0,
      buttonList: ["pomodoro", "short break", "long break"],
      slideItemSelection: "pomodoro",
      translateX: 0,
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    if(this.state.slideItemSelection !== prevState.slideItemSelection) {
      this.props.handleParentSlideItemSelection(this.state.slideItemSelection);
    }
    
  }
 
  handleSelectedMode = (childData) => {
    if (this.props.isTimerOnProgress) {
      this.props.handleDialogCallback(true, "skip");
    }
    
    
    else {
      this.setState({
        activeMode: childData
      }, () => {
        this.props.handleSelectedActiveMode(this.state.activeMode);
      });
    } 
  }

  handleSelectedButtonTopVal = (childData) => {
    this.setState({
      top: childData + "px"
    });
  }

  handleSelectedButtonWidthVal = (childData) => {
    this.setState({
      width: childData + "px"
    });
  }

  handleChildSlideItemSelection = (childData) => {
    this.setState({
      slideItemSelection: childData
    });
  }
  
  handleSelectedButtonTranslateX = (childData) => {
    this.setState({
      translateX: childData
    });
  }
 
  toggleSettingsScreen = () => {
    this.setState({
      isSettingsOpen: !this.props.isSettingsOpen
    }, () => { this.props.handleToggleSettingsScreen(this.state.isSettingsOpen);
    });
  }
  
  render() {
    const {left, top, width, activeMode, buttonList, translateX} = this.state;
    return(
      <div className={this.props.isTimerRunning && "disabled"}>
        <div className="button-container">
          <SlideButtonItem
            item={buttonList} 
            // activeMode={activeMode}
            activeMode={this.props.activeMode}
            isTimerOnProgress={this.props.isTimerOnProgress}
            isDialogOpen={this.props.isDialogOpen}
            dialogReturn={this.props.dialogReturn}
            handleDialogCallback={this.props.handleDialogCallback}
            handleDialogReturnResult={this.props.handleDialogReturnResult}
            handleSelectedMode={this.handleSelectedMode}
            handleSelectedButtonTopVal={this.handleSelectedButtonTopVal}
            handleSelectedButtonWidthVal={this.handleSelectedButtonWidthVal}
            handleChildSlideItemSelection={this.handleChildSlideItemSelection}
            handleSelectedButtonTranslateX={this.handleSelectedButtonTranslateX}
            isResizeActive={this.props.isResizeActive}
            />
          {/*<div className="highlight" style={{"left": left, "top": top, "width": width, "transform" : translateX }}></div>*/}
          <div className="highlight" style={{"top": top, "width": width, "transform" : translateX}}></div>
        </div>
        <a 
          href='javascript:void(0)' 
          onClick={this.toggleSettingsScreen}>
          <i class="fa-solid fa-gear"></i>
        </a>
      </div>
    );
  }
}
class NumericInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Number(this.props.value),
      increment: Number(this.props.increment),
      minLimit: Number(this.props.minLimit),
      maxLimit: Number(this.props.maxLimit),
    }
  }
  
  decrease = (name) => {
    let {value, increment, minLimit, maxLimit} = this.state;
 
    this.setState({
      value: value < increment * 2 ? minLimit : value === maxLimit && increment !== 1 ? value + (increment - (value % increment)) - increment : value - increment,
    },
    ()=> {
      this.props.handleTime(name,this.state.value);
    });
    
  }
  
  increase = (name) => {
    let {value, increment, minLimit, maxLimit} = this.state;
    
     this.setState({
      value: maxLimit - increment < value ? maxLimit : value === minLimit  && increment !== 1 ? increment : value + increment,
    },    
    ()=> {
       this.props.handleTime(name,this.state.value);
    });
    
  }
  
  render() {
    const isItBreakContent = this.props.name.indexOf('break') > -1;
    return (

      <div className={`item ${this.props.disabled && "disabled"}`}>
        <div>
          <a 
            href="javascript:void(0)" 
            onClick={()=>this.decrease(this.props.name)}
            id={isItBreakContent ? "break-decrement" : "session-decrement"}
            ></a>
          <span 
            id={isItBreakContent ? "break-length" : "session-length"}
            >{this.state.value}</span>
          <a
            href="javascript:void(0)" 
            onClick={()=>this.increase(this.props.name)}
            id={isItBreakContent ? "break-increment" : "session-increment"}
            ></a>
        </div>
        <p id={isItBreakContent ? "break-label" : "session-label"}>{this.props.name}</p>
        <span>-- on progress --</span>
      </div>  

    );
  }
}

class RadioContainer extends React.Component {
  constructor(props) {
    super(props); 
  }
  
  render() {
    const {theme} = this.props;
    return (
      <div className="theme-container">
        <RadioButton 
          name="blue" 
          isChecked={theme === "blue" ? true : false} 
          handleSelectedTheme={this.props.handleSelectedTheme}
          autoModeTheme={this.props.autoModeTheme}
          />
        <RadioButton 
          name="green" 
          isChecked={theme === "green" ? true : false} 
          handleSelectedTheme={this.props.handleSelectedTheme}
          autoModeTheme={this.props.autoModeTheme}
          />
        <RadioButton 
          name="red" 
          isChecked={theme === "red" ? true : false} 
          handleSelectedTheme={this.props.handleSelectedTheme}
          autoModeTheme={this.props.autoModeTheme}
          /> 
        <RadioButton 
          name="auto" 
          isChecked={theme === "auto" ? true : false} 
          handleSelectedTheme={this.props.handleSelectedTheme}
          autoModeTheme={this.props.autoModeTheme}
          /> 
      </div>
    );
  }
}
class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTheme: "auto", //green
    }
  }
  
  
  onValueChange = (event) => {
    const {name, autoModeTheme} = this.props;
    
    // const selectedTheme = name === "auto" ? autoModeTheme : this.state.selectedTheme;
    const selectedTheme = event.target.value;
    // const selectedTheme = event.target.value === "auto" ? autoModeTheme : event.target.value;
    this.setState ({
      selectedTheme: selectedTheme
    }, () => {
      this.props.handleSelectedTheme(this.state.selectedTheme);
    });
  }
  
  render() {
    const {name, isChecked} = this.props;
    
    return (
      <>
        <label className={`theme-${name}`}>
          <input
            type="radio"
            name="theme"
            value={name}
            checked={isChecked}
            onChange={this.onValueChange}
            id={"theme-" + name} />
          <span></span>
        </label>
      </>

    );
  }
}
class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTheme: "auto", //green
      isSettingsOpen: false,
      timePomodoro: "25",
      timeShort: "5",
      timeLong: "25",
    }
    this.handleSelectedTheme = this.handleSelectedTheme.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }
  
  handleSelectedTheme = (childData) => {
    this.setState({selectedTheme:  childData}, () => {
      this.props.handleSelectedTheme(childData)
    });
  }
  
  toggleSettingsScreen = () => {
    
    this.setState({
      isSettingsOpen: !this.props.isSettingsOpen
    }, () => {
      this.props.handleToggleSettingsScreen(this.state.isSettingsOpen);
    });
    
  }
  
  
  handleTime = (childName, childValue) => {
    const {timePomodoro, timeShort, timeLong} = this.state;
    this.setState({
      timePomodoro: childName === "pomodoro" ? childValue : timePomodoro,
      timeShort: childName === "short break" ? childValue : timeShort,
      timeLong: childName === "long break" ? childValue : timeLong,
    }, ()=>{
      this.props.handleTimerData(this.state.timePomodoro, this.state.timeShort, this.state.timeLong)
    });
  }
  
  
  render() {
    const {timePomodoro, timeShort, timeLong, selectedActiveMode, isTimerOnProgress}= this.props;
    return (
      <div class="settings">
        <section align="left">
          <h1>what is pomodoro?</h1>
          <p><b>Pomodoro</b> is a time management technique that helps people improve productivity and focus. It involves breaking down work into <b>25-minute intervals</b>, followed by <b>a short 5-minute break</b>, and then taking <b>a longer 15-30 minute break</b> after every four work sessions. Developed by Francesco Cirillo in the late 1980s, the Pomodoro technique is widely used among students, professionals, and creators as a way to increase productivity, manage time more effectively, and reduce the likelihood of burnout or mental fatigue.</p>
        </section>
        <section>
          <div>
            <h4>TIME</h4>
            <div className="num-container">
              <NumericInput 
                value={timePomodoro}
                handleTime={this.handleTime}
                minLimit="1"
                maxLimit="59"
                increment="1" // set it to 1 or 5
                name="pomodoro"
                disabled={selectedActiveMode === "pomodoro" && isTimerOnProgress ? true : false}
                // themeDefault="blue"
                />

              <NumericInput 
                selectedActiveMode={selectedActiveMode}
                value={timeShort}
                handleTime={this.handleTime}
                minLimit="1"
                maxLimit="59"
                increment="1"
                name="short break"
                disabled={selectedActiveMode === "short break" && isTimerOnProgress ? true : false}
                // themeDefault="red"
                />

              <NumericInput 
                selectedActiveMode={selectedActiveMode}
                value={timeLong}
                handleTime={this.handleTime}
                minLimit="1"
                maxLimit="59" // set it to 1 or 5
                increment="1"
                name="long break"
                disabled={selectedActiveMode === "long break" && isTimerOnProgress ? true : false}
                // themeDefault="green"
                />
              
            </div>
          </div>
          <div>
            <h4>COLOR</h4>
            <RadioContainer autoModeTheme={this.props.autoModeTheme} theme={this.state.selectedTheme} handleSelectedTheme={this.handleSelectedTheme}/>
          </div>
        </section>
        <section>
          <div className="btn-group">
            <button className="secondary" onClick={this.toggleSettingsScreen}><i class="fa-solid fa-chevron-left"></i>&nbsp;&nbsp;back</button>
            <button className="primary" id="codepen" type="button" onClick={()=> {window.open('https://codepen.io/badeozgule','_blank')}}><i class="fab fa-codepen"></i> codepen</button>
          </div>
        </section>
      </div>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isSettingsOpen: false,
      selectedTheme: "green", 
      autoModeTheme: "green",
      selectedActiveMode: "pomodoro",
      timePomodoro: "25",
      timeShort: "5",
      timeLong: "25",
      isResizeActive: false,
      isDialogOpen: false,
      dialogType: null,
      dialogReturn: null,
      isTimerRunning: false,
      isTimerOnProgress: false,
      isAutoModeThemeActive: true, //false
      sessionFocusCounter: 0,
      slideItemSelection: "pomodoro",
    }
    
    this.animationTimeout = undefined;
    this.resizeTimeout = undefined;
    this.resizeListener = this.resizeListener.bind(this);
  }
   
  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.updateThemeColorMetaTag();
    console.log("============================================================");
    console.log("🎉 React Pomodoro App project picked by CodePen team! 27.12.2023 🎉");
    console.log("🎨 Designed and developed by Bade Ozgule 👩‍💻");
    console.log("============================================================");
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  
  resizeListener = () => {
    this.setState({ isResizeActive: true });
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.setState({ isResizeActive: false });
      }, 250);
  }
  
  toggleSettingsScreen = (childData) => {
    this.setState({
      isSettingsOpen: !!childData ? childData : !this.state.isSettingsOpen
    });
  }
  
  handleSelectedTheme = (childData) => {
    this.setState({
      isAutoModeThemeActive: childData === "auto" ?  true : false,
    }, ()=> {
      this.setState({
        selectedTheme: childData === "auto" ?  this.state.autoModeTheme : childData,
      }, () => {
        this.updateThemeColorMetaTag(this.state.selectedTheme);
      });
    }); 
  }
  
  handleSelectedActiveMode = (childData) => {
    const {selectedActiveMode,isAutoModeThemeActive,isTimerRunning, sessionFocusCounter, slideItemSelection} = this.state;    
    if (childData === "skip") {
      if(selectedActiveMode !== slideItemSelection) {

        if (selectedActiveMode === "pomodoro") {

          if (slideItemSelection === "short break") {
            this.setState({
              selectedActiveMode: "short break",
              autoModeTheme: "red"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          } else if (slideItemSelection === "long break") {
            this.setState({
              selectedActiveMode: "long break",
              autoModeTheme: "blue"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          } 

        } else if (selectedActiveMode === "short break") {

          if (slideItemSelection === "pomodoro") {
            this.setState({
              selectedActiveMode: "pomodoro",
              autoModeTheme: "green"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          } else if (slideItemSelection === "long break") {
            this.setState({
              selectedActiveMode: "long break",
              autoModeTheme: "blue"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            }); 
          }

        } else if (selectedActiveMode === "long break") {
          if (slideItemSelection === "pomodoro") {
            this.setState({
              selectedActiveMode: "pomodoro",
              autoModeTheme: "green"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          } else if (slideItemSelection === "short break") {
            this.setState({
              selectedActiveMode: "short break",
              autoModeTheme: "red"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          }
        } 
      } 
      else {
        if (selectedActiveMode === "pomodoro") {
          if ((sessionFocusCounter % 4 === 0 && sessionFocusCounter !== 0)) {
            this.setState({
              selectedActiveMode: "long break",
              autoModeTheme: "blue"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          } else {
            this.setState({
              selectedActiveMode: "short break",
              autoModeTheme: "red"
            }, ()=> {
              if (isAutoModeThemeActive) { 
                this.handleSelectedTheme("auto");
              }
            });  
          } 
        } else if (selectedActiveMode === "short break" || selectedActiveMode === "long break") {
          this.setState({
            selectedActiveMode: "pomodoro",
            autoModeTheme: "green"
          }, ()=> {
            if (isAutoModeThemeActive) { 
              this.handleSelectedTheme("auto");
            }
          });  
        } 
       
      }
    }
 
    else if (childData !== "skip"){
      this.setState({
        selectedActiveMode: childData,
        autoModeTheme: childData === "pomodoro" ? "green" : childData === "short break" ? "red" : "blue"
      }, ()=> {
        if (isAutoModeThemeActive) { 
          this.handleSelectedTheme("auto");
        }
      });
    }
  }
  
  handleTimerData = (childPomodoroData, childShortData, childLongData) => {
    this.setState({
      timePomodoro: childPomodoroData,
      timeShort: childShortData,
      timeLong: childLongData,
    });
  }
  
  
  handleDialogCallback = (childData, childType) => { 
    if (childData) {
      clearTimeout(this.animationTimeout);
      this.setState({
        dialogType: childType, 
        isDialogOpen: childData,
      });
    } else {
      this.setState({
        isDialogOpen: childData,
      }, () =>  {
        this.animationTimeout = 
          setTimeout(() => this.setState({
          dialogType: childType, 
        }), 300)});
    }
    
    
  }
  
  handleDialogReturnResult = (childData) => {
    this.setState({
      dialogReturn: childData,
    });

  
  }
  
  handleIsTimerRunning = (childData) => {
    this.setState({
      isTimerRunning: childData,
    })
  }
  
  handleIsTimerOnProgress = (childData) => {
    this.setState({
      isTimerOnProgress: childData,
    })
  }
  
  handleFocusSessionCounter = (childData) => {
    this.setState({
      sessionFocusCounter: childData
    });
  }
  
  handleParentSlideItemSelection = (childData) => {
    this.setState({
      slideItemSelection: childData
    })
  }
  
  updateThemeColorMetaTag = (val) => {
    const {selectedTheme, autoModeTheme, isAutoModeThemeActive} = this.state;
    const color = !!val ? val : selectedTheme;
    const dynamicColor = color === "blue" ? "#03003d" : color === "red" ? "#29003d" : color === "green" ? "#001b3d" : "#fff";

    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    document.body.style.backgroundColor = dynamicColor;
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", dynamicColor);
    } else {
      const newMetaTag = document.createElement("meta");
      newMetaTag.name = "theme-color";
      newMetaTag.content = dynamicColor;
      document.head.appendChild(newMetaTag);
    }
  };
  
  render() {
    const {isResizeActive, isAutoModeThemeActive, selectedTheme} = this.state;
    return (
      <>
        <main className= {`${isAutoModeThemeActive ? "theme-auto theme-" + selectedTheme : "theme-" + selectedTheme} ${isResizeActive ? "resize-animation-stopper" : ""}`}>
          <GithubCorner url="https://github.com/badeozgule/react-pomodoro-app"/>  
          <div className={this.state.isSettingsOpen ? "hidden" : null}>
            <section align="left">
              <h1 id="timer-label">pomodoro App</h1>
              <p>Plan your work and stay productive</p> 
            </section>
            <Timer 
              timePomodoro={this.state.timePomodoro}
              timeShort={this.state.timeShort}
              timeLong={this.state.timeLong}
              dialogType={this.state.dialogType}
              dialogReturn={this.state.dialogReturn}
              isDialogOpen={this.state.isDialogOpen}
              selectedActiveMode={this.state.selectedActiveMode}
              handleSelectedActiveMode={this.handleSelectedActiveMode}
              handleDialogCallback={this.handleDialogCallback}
              handleDialogReturnResult={this.handleDialogReturnResult} 
              handleIsTimerRunning={this.handleIsTimerRunning}
              handleIsTimerOnProgress={this.handleIsTimerOnProgress}
              handleFocusSessionCounter={this.handleFocusSessionCounter}
              />
            <section class="controller">
              <SlideButtonContainer
                isTimerRunning={this.state.isTimerRunning}
                isTimerOnProgress={this.state.isTimerOnProgress}
                activeMode={this.state.selectedActiveMode}
                isDialogOpen={this.state.isDialogOpen}
                dialogReturn={this.state.dialogReturn}
                sessionFocusCounter={this.state.sessionFocusCounter}
                handleDialogCallback={this.handleDialogCallback}
                handleDialogReturnResult={this.handleDialogReturnResult}
                handleSelectedActiveMode={this.handleSelectedActiveMode}
                handleParentSlideItemSelection={this.handleParentSlideItemSelection}
                handleToggleSettingsScreen={this.toggleSettingsScreen}
                isResizeActive={this.state.isResizeActive}
                />
              <h5>Designed and coded by 
                <a target="_blank" href="https://codepen.io/badeozgule"> Bade Ozgule</a>
              </h5>
            </section>
          </div>

          <SettingsScreen 
            isSettingsOpen={this.state.isSettingsOpen}
            timePomodoro={this.state.timePomodoro}
            timeShort={this.state.timeShort}
            timeLong={this.state.timeLong}
            selectedActiveMode={this.state.selectedActiveMode}
            isTimerOnProgress={this.state.isTimerOnProgress}
            autoModeTheme={this.state.autoModeTheme}
            handleToggleSettingsScreen={this.toggleSettingsScreen}
            handleSelectedTheme={this.handleSelectedTheme}
            handleTimerData={this.handleTimerData}
            />
          <Dialog 
            mode={this.state.isDialogOpen} 
            isDialogOpen={this.state.isDialogOpen}
            dialogType={this.state.dialogType}
            handleDialogCallback={this.handleDialogCallback}
            handleDialogReturnResult={this.handleDialogReturnResult} 
            />
        </main>
      </>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("root")); 
