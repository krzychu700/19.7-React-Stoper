class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
              }
            };
        }

    reset() {
        this.setState({
            times: {
              minutes: 0,
              seconds: 0,
              miliseconds: 0
            }
        });
    }

        start() {
        if (!this.state.running) {
            this.setState({
                running: true
            })
            this.state.watch = setInterval(() => this.step(), 10);
        } else {
            this.setState({
                running: false
            })
        }
    }

    stop() {
        this.setState({
            running: false
          });
          clearInterval(this.watch);
     };

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
     const times = {...this.state.times }
      
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.miliseconds = 0;
            times.seconds += 1;
        }
        if (times.seconds >= 60) {
            times.seconds = 0;
            times.minutes += 1;
        }
        this.setState({
            times
        })
    }

    resetHard() {
      this.reset();
      }
      
    addScore() {
        let timeScore = document.getElementsByClassName("stopwatch");
        let li = document.createElement("li");
        let resultList = document.getElementById("results");
        li.innerHTML = timeScore[0].innerHTML;
        resultList.appendChild(li);
  }
  
     render () {
        const buttonLabel = this.state.running ? 'Pauza' : 'Start';
        return (
            <div>
          <div className="stoper">
            <div className="buttons">            
              <span href="#" className="button" id="buttonStart" onClick={this.start.bind(this)}>{buttonLabel}</span>
              <span href="#" className="button" id="buttonStart" onClick={this.addScore.bind(this)}>Add score</span>
              <span href="#" className="button" onClick={this.reset.bind(this)}>Reset</span>
              </div>
              <div className="stopwatch">{format(this.state.times)}</div>
            </div>
              <ul className="results" id="results"></ul></div>
          );
    }
}

function format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
}

function pad0(value) {
    let result = value.toString();

    return result.length < 2 ? ('0' + result):result;
}

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));