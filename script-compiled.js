'use strict';

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
            display: ''
        };
        _this.reset(false);
        _this.print(_this.times);
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset(working) {
            var times = this.state.times;
            this.state.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.setState({
                times: times
            });
            if (working) this.resetHard();
        }
    }, {
        key: 'print',
        value: function print() {
            this.state.display = this.format(this.state.times);
        }
    }, {
        key: 'format',
        value: function format() {
            return this.pad0(this.state.times.minutes) + ':' + this.pad0(this.state.times.seconds) + ':' + this.pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            var buttonName = document.getElementById("buttonStart");
            if (!this.state.running) {
                this.setState({
                    running: true
                });
                buttonName.innerHTML = 'Pauza';
                this.state.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            } else {
                this.setState({
                    running: false
                });
                buttonName.innerHTML = 'Start';
                clearInterval(this.watch);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var times = this.state.times;
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
                times: times
            });
        }
    }, {
        key: 'resetHard',
        value: function resetHard() {
            this.addScore();
            this.print();
        }
    }, {
        key: 'addScore',
        value: function addScore() {
            var li = document.createElement("li");
            var resultList = document.getElementById("results");

            li.innerHTML = this.state.display;
            resultList.appendChild(li);
        }
    }, {
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();

            return result.length < 2 ? '0' + result : result;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'stoper' },
                    React.createElement(
                        'div',
                        { className: 'buttons' },
                        React.createElement(
                            'span',
                            { href: '#', className: 'button', id: 'buttonStart', onClick: this.start.bind(this) },
                            'Start'
                        ),
                        React.createElement(
                            'span',
                            { href: '#', className: 'button', onClick: this.reset.bind(this) },
                            'Reset'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stopwatch' },
                        this.state.display
                    )
                ),
                React.createElement('ul', { className: 'results', id: 'results' })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var app = React.createElement(Stopwatch);
ReactDOM.render(app, document.getElementById("app"));
