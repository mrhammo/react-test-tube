# React Test Tube

React Test Tube is a lightweight tool to perform A/B and multi-variate split tests in your React code.

## Installation

Install React Test Tube using NPM.

```$ npm i --save react-test-tube```

## Usage

To perform a simple A/B split test of two components in your React application create an `<Experiment />` containing two or more `<Variant />` components. By default the winning `<Variant />` is chosen at random. You can customise this by providing a reducer function.

```jsx
<Experiment name="my_experiment">
    <Variant name="my_variant_a">
        <ComponentA />
    </Variant>
    <Variant name="my_variant_b">
        <ComponentB />
    </Variant>
</Experiment>
```

## Experiment

```jsx
<Experiment
    name="my_experiment"
    reducer={Random()}
    cache={Cache()}
    onParticipation={participationCallback}
>
    ...
</Experiment>
```

| Prop | Description | Default | Required |
| ---- | ----------- | ------- | -------- |
| name | The name of the experiment. | - | Yes |
| reducer | An instance of a reducer function. | Random | No |
| cache | An instance of a cache function. | Cache | No |
| onParticipation | A function that is called when a variant is chosen. | - | No |

## Variant

```jsx
<Variant name="my_variant_a">
    ...
</Variant>
```

| Prop | Description | Default | Required |
| ---- | ----------- | ------- | -------- |
| name | The name of the variant. | - | Yes |

## Reducers

A reducer is a function that takes an array of `<Variant />` components as an argument and returns a single winning `<Variant />` which is to be rendered. Several reducer functions are included out of the box or you can create your own reducer function by providing it to the `reducer` prop of an `<Experiment />`.

**Note:** The built-in reducer functions are in fact factory functions whose return value is the reducer function itself, allowing for configuration of the reducer. This is why, when specifying a built-in reducer, we must use `reducer={Random()}` and not `reducer={Random}`. See "Creating a custom Reducer" for more details.

### Random
The `Random` reducer selects a winning `<Variant />` at random. It is the **default** reducer and does not need specifying.
```jsx
import { Experiment, Variant, Random } from 'react-test-tube';

const App = () => (
    <Experiment name="my_experiment" reducer={Random()}>
        <Variant name="variant_a">
            <h1>Variant A</h1>
        </Variant>
        <Variant name="variant_b">
            <h1>Variant B</h1>
        </Variant>
    </Experiment>
);
```

### Modulo
The `Modulo` reducer selects a winning `<Variant />` based on a number provided in the configuration, such as a user ID. For an `<Experiment />` with three `<Variant />` components, when providing the number `2` as the only argument to the reducer, the calculation in effect is `2%3`. The result is shifted by -1 in order to show the most logical `<Variant />`. Therefore, `2%3` would return the second `<Variant />` at index `1` rather than the third (`2%3 = 2`).

```jsx
import {Experiment, Variant, Modulo } from 'react-test-tube';

const App = ({ userId }) => (
    <Experiment name="my_experiment" reducer={Modulo(userId)}>
        <Variant name="variant_a">
            <h1>Variant A</h1>
        </Variant>
        <Variant name="variant_b">
            <h1>Variant B</h1>
        </Variant>
    </Experiment>
);
```

| Argument | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| id | An integer to use to determine the modulos, such as a user ID. | - | Yes |

### Query String
The `QueryString` reducer selects a winning `<Variant />` based on paramters provided in the query string of the URL. By default the parameters are `exp` (to specify the experiment) and `var` (to specify the variant). The reducer can be customised via its configuration to look at different parameters in the query string. Additionally, a `fallbackReducer` can be provided where the required parameters are not present in the URL. By default this is not provided and will return the first `<Variant />`.

```jsx
import { Experiment, Variant, QueryString, Random } from 'react-test-tube';

const App = () => (
    <Experiment name="my_experiment" reducer={QueryString('exp', 'var', Random())}>
        <Variant name="variant_a">
            <h1>Variant A</h1>
        </Variant>
        <Variant name="variant_b">
            <h1>Variant B</h1>
        </Variant>
    </Experiment>
);
```

| Argument | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| experiment | The query string parameter that provides the ID of the experiment | exp | No |
| variant | The query string parameter that provides the ID of the winning variant | var | No |
| fallbackReducer | A reducer function that will be called if the query string does not contain the required parameters. | - | No |

### Google Optimize
The `GoogleOptimize` reducer provides an integration with [Google Optimize](https://marketingplatform.google.com/intl/en_uk/about/optimize/) experiments, providing the advantages of managing and analysing your experiments from the Google Optimize tool whilst creating your variants as React components.

**Required:** Google Optimize is required to be installed on the page. Follow the [instructions to install Google Optimize](https://support.google.com/optimize/answer/7513085) on your website.

**Credit:** The `GoogleOptimize` reducer uses the [@react-hook/google-optimize](https://www.npmjs.com/package/@react-hook/google-optimize) library. If you do not require the additional functionality provided by `react-test-tube` then I recommend that you check out this library.

```jsx
import { Experiment, Variant, GoogleOptimize } from 'react-test-tube';
import MyLoadingComponent from 'MyLoadingComponent';

const App = () => (
    <Experiment
        name="my_experiment"
        reducer={GoogleOptimize(
            'GOOGLE_OPTIMIZE_EXPERIMENT_ID',
            <MyLoadingComponent />,
            6000
        )}
    >
        <Variant name="variant_a">
            <h1>Variant A</h1>
        </Variant>
        <Variant name="variant_b">
            <h1>Variant B</h1>
        </Variant>
    </Experiment>
);
```
| Argument | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| experimentId | The ID of the experiment as provided in the Google Optimize interface. | - | Yes |
| loadingState | A component that will be rendered whilst the winning `<Variant />` is chosen. | null | No |
| timeout | The time in ms in which a winning `<Variant />` must be chosen before defaulting to show the first. | 3000 | No |

### Creating a custom Reducer
A reducer is a function that takes an array of `<Variant />` components as an argument and returns a single winning `<Variant />` which is to be rendered. You can therefore provide any function that follows that convention.

```jsx
const AlwaysChooseFirstVariant = variants => variants[0];

<Experiment name="my_experiment" reducer={AlwaysChooseFirstVariant}>
    ...
</Experiment>
```

As a reducer is just a function, you can also use a factory function to provide additional configuration. This is a pattern that is used for all built-in reducer functions.

```jsx
/* This is just an example. I recommend coding more defensively than this! */
const HardCodeWinningVariant = index => variants => variants[index - 1];

<Experiment name="my_experiment" reducer={HardCodeWinningVariant(2)}>
    ...
</Experiment>
```

### Caching
When a winning `<Variant />` is chosen it is assumed that you will want your user to see the same `<Variant />` on subsequent sessions, and not receive a different `<Variant />` if they reload the page or navigate away and return later. The built-in `Cache` function caches the winning `<Variant />` in Local Storage and returns it from the cache on future visits, bypassing the reducer function.

The built-in `Cache` is provided by default. You do not need to specify it when creating an `<Experiment />`. You can provide a custom cache function by setting the `cache` property.

A cache function is similar to a reducer. It is provided with the name of the experiment (to help avoid naming collisions with other cached experiments), the array of `<Variant />` components, and a reducer function to run in the case of a miss (this reducer function is passed on from the `<Experiment />`).

```jsx
const SessionStorageCache = () => (experiment, variants, reducer) => {
    const cacheKey = `exp_${experiment}_variant`;
    const cachedVariantName = window.sessionStorage.getItem(cacheKey);
    ...
    return chosenVariant;
};

<Experiment name="my_experiment" cache={SessionStorageCache()}>
    ...
</Experiment>
```

| Argument | Description | Default | Required |
| -------- | ----------- | ------- | -------- |
| experiment | The name of the experiment. Helps to avoid naming collisions. | - | Yes |
| variants | An array of `<Variant />` components. | - | Yes |
| reducer | A reducer function to call if there is a cache miss. | - | Yes |


## Participation Callback

When a winning `<Variant />` is chosen you can access the name of both the `<Experiment />` and the winning `<Variant />` via the `onParticipation` callback.

```jsx
const myOnParticipationCallback = (experimentName, variantName) => {
    console.log(`I chose the ${variantName} variant for the ${experimentName} experiment.`);    
};

<Experiment name="my_experiment" onParticipation={myOnParticipationCallback}>
    ...
</Experiment>
```

## Contributing

If you find a bug or would like to contribute, please raise an issue and create a pull request on GitHub. Thanks!
