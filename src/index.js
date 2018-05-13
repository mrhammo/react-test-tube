import React from "react";
import PropTypes from "prop-types";

class Experiment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        return (
          <div className="experiment" id={ this.props.name }>
              { this.state.variant.component }
          </div>
        );
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

class Variant extends React.Component {
    render() {
        return (
            <div className="variant" id={ this.props.name }>
                { this.props.children }
            </div>
        );
    }
}

Variant.propTypes = {
    name: PropTypes.string.isRequired
}

export { Experiment, Variant }
