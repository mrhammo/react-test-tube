import { Component } from "react";
import PropTypes from "prop-types";

class Experiment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variant: {
                id: null,
                component: null
            }
        };
    }

    chooseRandomVariant () {
        const index = Math.floor(Math.random() * (this.props.children.length));
        const variant = this.props.children[index];

        return variant;
    }

    onParticipation(experiment, variant) {
        if ("undefined" !== typeof this.props.onParticipation) {
            this.props.onParticipation(experiment, variant);
        }
    }

    componentDidMount() {
        let variant = this.chooseRandomVariant();

        this.setState({
            variant: {
                id: variant.props.id,
                component: variant
            }
        });

        this.onParticipation(this.props.id, variant.props.id);
    }

    render() {
        return this.state.variant.component;
    }
}

Experiment.propTypes = {
    id: PropTypes.string.isRequired,
    onParticipation: PropTypes.func
};

class Variant extends Component {
    render() {
        return this.props.children;
    }
}

Variant.propTypes = {
    id: PropTypes.string.isRequired
};

export { Experiment, Variant }
