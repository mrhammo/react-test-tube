import React from 'react';
import PropTypes from 'prop-types';

const Variant = (props) => {
    const { name, children } = props;

    return (
        <div className="experiment_variant" id={`var_${name}`}>
            {children}
        </div>
    );
};

Variant.propTypes = {
    name: PropTypes.string.isRequired
}

export default Variant;