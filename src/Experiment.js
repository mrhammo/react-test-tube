import React from 'react';
import PropTypes from 'prop-types';
import Cache from './Cache';
import Random from './reducers/Random';

const Experiment = (props) => {
    const {
        name,
        reducer,
        cache,
        onParticipation,
        children: variants
    } = props;

    const variant = cache(name, variants, reducer);

    if (variant && variant?.props?.name) {
        onParticipation(name, variant.props.name);
    }

    return (
        <div className="experiment" id={`exp_${name}`}>
            {variant}
        </div>
    );
};

Experiment.propTypes = {
    name: PropTypes.string.isRequired,
    onParticipation: PropTypes.func,
    reducer: PropTypes.func,
    cache: PropTypes.func,
}

Experiment.defaultProps = {
  onParticipation: () => null,
  reducer: Random(),
  cache: Cache(),
}

export default Experiment;