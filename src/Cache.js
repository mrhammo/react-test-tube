const Cache = () => (experiment, variants, reducer) => {
    const cacheKey = `exp_${experiment}_variant`;
    const cachedVariantName = window.localStorage.getItem(cacheKey);

    let variant = null;

    if (cachedVariantName) {
        const matchingVariants = variants.filter(variant => variant.props.name === cachedVariantName);

        if (matchingVariants.length === 1) {
            variant = matchingVariants[0];
        }
    }

    if (!variant) {
        variant = reducer(variants);

        if (variant && variant?.props?.name) {
            window.localStorage.setItem(cacheKey, variant.props.name);
        }
    }

    return variant;
};

export default Cache;