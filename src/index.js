import { Component } from "react";
import PropTypes from "prop-types";

class Experiment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experiment: {
              name: props.name
            },
            variant: {
                name: null,
                component: null
            }
        };
    }

    componentDidMount() {
        let variant = this.props.reducer(this.props.children);

        this.setState({
            variant: {
                name: variant.props.name,
                component: variant
            }
        });

        this.props.onParticipation(this.props.name, variant.props.name);
    }

    render() {
        return this.state.variant.component;
    }
}

Experiment.propTypes = {
    name: PropTypes.string.isRequired,
    onParticipation: PropTypes.func,
    reducer: PropTypes.func
}

Experiment.defaultProps = {
  onParticipation: () => null,
  reducer: (variants) => {
    const index = Math.floor(Math.random() * (variants.length));
    return variants[index];
  }
}

class Variant extends Component {
    render() {
        return this.props.children;
    }
}

Variant.propTypes = {
    name: PropTypes.string.isRequired
}

export { Experiment, Variant }
