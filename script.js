class Stopwatch extends React.Component {
    constructor(props) {
        super(props); //pogadac o tym
        this.state = {
            running: false,
            display: '',
        }
        this.reset(false);
        this.print(this.times);
    }

    reset(working) {
        let times = this.state.times;
        this.state.times ={
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.setState({
            times
        })
       if(working) this.resetHard();
    }

    print() {
        this.state.display = this.format(this.state.times);
    }

    format() {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
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
            clearInterval(this.watch);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
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
      this.addScore();
      this.print();
      }
      
    addScore() {
        let li = document.createElement("li");
        let resultList = document.getElementById("results");
            
        li.innerHTML = this.state.display;
        resultList.appendChild(li);
  }
  
  pad0(value) {
      let result = value.toString();

      return result.length < 2 ? ('0' + result):result;
  }

    render () {
        return (
            <div>
          <div className="stoper">
            <div className="buttons">
              <span href="#" className="button" id="buttonStart" onClick={this.start.bind(this)}>Start</span>
              <span href="#" className="button" onClick={this.reset.bind(this)}>Reset</span>
              </div>
              <div className="stopwatch">{this.state.display}</div>
            </div>
              <ul className="results" id="results"></ul></div>
          );
    }
}

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));