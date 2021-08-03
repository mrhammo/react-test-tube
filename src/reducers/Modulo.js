const Modulo = id => (variants) => {
    const index = (id % variants.length) - 1;

    return index >= 0
        ? variants[index]
        : variants[variants.length - 1];
};

export default Modulo;