"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Variant = exports.Experiment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Experiment = function (_Component) {
    _inherits(Experiment, _Component);

    function Experiment(props) {
        _classCallCheck(this, Experiment);

        var _this = _possibleConstructorReturn(this, (Experiment.__proto__ || Object.getPrototypeOf(Experiment)).call(this, props));

        _this.state = {
            variant: {
                id: null,
                component: null
            }
        };
        return _this;
    }

    _createClass(Experiment, [{
        key: "chooseRandomVariant",
        value: function chooseRandomVariant() {
            var index = Math.floor(Math.random() * this.props.children.length);
            var variant = this.props.children[index];

            return variant;
        }
    }, {
        key: "onParticipation",
        value: function onParticipation(experiment, variant) {
            if ("undefined" !== typeof this.props.onParticipation) {
                this.props.onParticipation(experiment, variant);
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var variant = this.chooseRandomVariant();

            this.setState({
                variant: {
                    id: variant.props.id,
                    component: variant
                }
            });

            this.onParticipation(this.props.id, variant.props.id);
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.variant.component;
        }
    }]);

    return Experiment;
}(_react.Component);

Experiment.propTypes = {
    id: _propTypes2.default.string.isRequired,
    onParticipation: _propTypes2.default.func
};

var Variant = function (_Component2) {
    _inherits(Variant, _Component2);

    function Variant() {
        _classCallCheck(this, Variant);

        return _possibleConstructorReturn(this, (Variant.__proto__ || Object.getPrototypeOf(Variant)).apply(this, arguments));
    }

    _createClass(Variant, [{
        key: "render",
        value: function render() {
            return this.props.children;
        }
    }]);

    return Variant;
}(_react.Component);

Variant.propTypes = {
    id: _propTypes2.default.string.isRequired
};

exports.Experiment = Experiment;
exports.Variant = Variant;