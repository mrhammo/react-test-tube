# React Test Tube

React Test Tube is a lightweight tool to perform A/B and multi-variate split tests in your React code.

### Installation

Install React Test Tube using NPM.

```$ npm install react-test-tube```

### Usage

To perform a simple A/B split test of two components in your React application simply wrap each component in a `<Variant />` within the `<Experiment />` component.

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

#### Required Props

Both an `<Experiment />` and `<Variant />` require the `name` (string) prop.

### Caching

By default the variant will be chosen at random each time the component is mounted. This will result in the possibility of a different variant being shown to the user when the page is refreshed.

If you'd like your user to see the same variant then you can cache the variant when it is chosen by creating your own reducer function (detailed below).

### Reducers

Each time the `<Experiment />` component mounts it calls its reducer function to determine the winning `<Variant />` component. By default this uses the built-in Random Reducer.

You can create your own reducer function by passing it to the `reducer` prop of the `<Experiment />` component. A reducer is a simple function that receives an array of `<Variant />` components as its only argument and returns the chosen `<Variant />`.

You can use custom reducers to cache the winning variant or to use custom weights for variants.

### Participation Callback

When a winning `<Variant />` is chosen you can perform your own function by passing your function to the `onParticipation` prop of the `<Experiment />`. The function should accept the names of the experiment and the winning variant as its arguments.

You can use an `onParticipation` callback to pass experiment details back to your chosen analytics platform, such as Google Experiments.

```javascript
myOnParticipationCallback(experimentName, variantName) {
    window.ga.set("exp", experimentName + "_" + variantName);
}
```

```jsx
<Experiment onParticipation={ myOnParticipationCallback }>
...
</Experiment>
```

### Contributing

This library does not currently have any tests. If you find a bug or would like to contribute, please raise an issue and create a pull request. Thanks!
