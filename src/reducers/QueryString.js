const QueryString = (expimentParameter, variantParameter, fallbackReducer) => (variants) => {
    const params = new URLSearchParams(window.location.search);
    const experimentName = params.get(expimentParameter || 'exp');
    const variantName = params.get(variantParameter || 'var');

    if (fallbackReducer && (!experimentName || !variantName)) {
        return fallbackReducer(variants);
    }

    let matchingVariants = variants.filter(variant => variant.props.name === variantName);

    if (matchingVariants.length === 1) {
        return matchingVariants[0];
    }
    
    return variants[0];
};

export default QueryString;