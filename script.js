class Stopwatch extends React.Component {
    constructor(props) {
        super(props); //pogadac o tym
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
        let buttonName = document.getElementById("buttonStart");
        if (!this.state.running) {
            this.setState({
                running: true
            })
            buttonName.innerHTML= 'Pauza';
            this.state.watch = setInterval(() => this.step(), 10);
        } else {
            this.setState({
                running: false
            })
            buttonName.innerHTML = 'Start';
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
        let times = this.state.times;
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.miliseconds = 0;
            this.state.times.seconds += 1;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.seconds = 0;
            this.state.times.minutes += 1;
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
        return (
            <div>
          <div className="stoper">
            <div className="buttons">
              <span href="#" className="button" id="buttonStart" onClick={this.start.bind(this)}>Start</span>
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