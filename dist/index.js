"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Variant = exports.Experiment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Experiment = function (_React$Component) {
    _inherits(Experiment, _React$Component);

    function Experiment(props) {
        _classCallCheck(this, Experiment);

        var _this = _possibleConstructorReturn(this, (Experiment.__proto__ || Object.getPrototypeOf(Experiment)).call(this, props));

        _this.state = {
            variant: {
                name: null,
                component: null
            }
        };
        return _this;
    }

    _createClass(Experiment, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var variant = this.props.reducer(this.props.children);

            this.setState({
                variant: {
                    name: variant.props.name,
                    component: variant
                }
            });

            this.props.onParticipation(this.props.name, variant.props.name);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "experiment", id: this.props.name },
                this.state.variant.component
            );
        }
    }]);

    return Experiment;
}(_react2.default.Component);

Experiment.propTypes = {
    name: _propTypes2.default.string.isRequired,
    onParticipation: _propTypes2.default.func,
    reducer: _propTypes2.default.func
};

Experiment.defaultProps = {
    onParticipation: function onParticipation() {
        return null;
    },
    reducer: function reducer(variants) {
        var index = Math.floor(Math.random() * variants.length);
        return variants[index];
    }
};

var Variant = function (_React$Component2) {
    _inherits(Variant, _React$Component2);

    function Variant() {
        _classCallCheck(this, Variant);

        return _possibleConstructorReturn(this, (Variant.__proto__ || Object.getPrototypeOf(Variant)).apply(this, arguments));
    }

    _createClass(Variant, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "variant", id: this.props.name },
                this.props.children
            );
        }
    }]);

    return Variant;
}(_react2.default.Component);

Variant.propTypes = {
    name: _propTypes2.default.string.isRequired
};

exports.Experiment = Experiment;
exports.Variant = Variant;