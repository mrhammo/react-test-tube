import useGoogleOptimize from '@react-hook/google-optimize';

const GoogleOptimize = (experimentId, LoadingState = null, timeout=3000) => (variants) => {
    const Variant = useGoogleOptimize(experimentId, variants, timeout);

    return !Variant ? LoadingState : Variant;
};

export default GoogleOptimize;