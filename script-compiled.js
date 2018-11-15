"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        //pogadac o tym
        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "reset",
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            // let buttonName = document.getElementById("buttonStart");
            if (!this.state.running) {
                this.setState({
                    running: true
                });
                // buttonName.innerHTML= 'Pauza';
                this.state.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            } else {
                this.setState({
                    running: false
                });
                // buttonName.innerHTML = 'Start';
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: "calculate",
        value: function calculate() {
            var times = _extends({}, this.state.times);

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
                times: times
            });
        }
    }, {
        key: "resetHard",
        value: function resetHard() {
            this.reset();
        }
    }, {
        key: "addScore",
        value: function addScore() {
            var timeScore = document.getElementsByClassName("stopwatch");
            var li = document.createElement("li");
            var resultList = document.getElementById("results");
            li.innerHTML = timeScore[0].innerHTML;
            resultList.appendChild(li);
        }
    }, {
        key: "render",
        value: function render() {
            // let span;

            // if (this.state.running) {
            //     span = <PauzaButton href="#" className="button" id="buttonStart" onClick={this.start.bind(this)} />;
            // } else {
            //     span = <StartButton href="#" className="button" id="buttonStart" onClick={this.start.bind(this)} />;
            // }
            var buttonLabel = this.state.running ? 'Pauza' : 'Start';
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "stoper" },
                    React.createElement(
                        "div",
                        { className: "buttons" },
                        React.createElement(
                            "span",
                            { href: "#", className: "button", id: "buttonStart", onClick: this.start.bind(this) },
                            buttonLabel
                        ),
                        React.createElement(
                            "span",
                            { href: "#", className: "button", id: "buttonStart", onClick: this.addScore.bind(this) },
                            "Add score"
                        ),
                        React.createElement(
                            "span",
                            { href: "#", className: "button", onClick: this.reset.bind(this) },
                            "Reset"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "stopwatch" },
                        format(this.state.times)
                    )
                ),
                React.createElement("ul", { className: "results", id: "results" })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function StartButton(props) {
    return React.createElement(
        "span",
        { onClick: props.onClick },
        "Start"
    );
}

function PauzaButton(props) {
    return React.createElement(
        "span",
        { onClick: props.onClick },
        "Pauza"
    );
}

function format(times) {
    return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
}

function pad0(value) {
    var result = value.toString();

    return result.length < 2 ? '0' + result : result;
}

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
