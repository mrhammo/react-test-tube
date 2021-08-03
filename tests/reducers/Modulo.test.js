import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Modulo from '../../src/reducers/Modulo';
import Variant from '../../src/Variant';

const variants = [
    <Variant name="a">
        <h1>Variant A Content</h1>
    </Variant>,
    <Variant name="b">
        <h1>Variant B Content</h1>
    </Variant>,
    <Variant name="c">
        <h1>Variant C Content</h1>
    </Variant>,
];

describe('Modulo Reducer', () => {
    test('it picks the correct variant based on the id', () => {
        const { container: firstTest } = render(Modulo(1)(variants));
        const { container: secondTest } = render(Modulo(2)(variants));
        const { container: thirdTest } = render(Modulo(3)(variants));
        const { container: fourthTest } = render(Modulo(4)(variants));

        expect(firstTest.firstChild.firstChild.innerHTML).toEqual('Variant A Content');
        expect(secondTest.firstChild.firstChild.innerHTML).toEqual('Variant B Content');
        expect(thirdTest.firstChild.firstChild.innerHTML).toEqual('Variant C Content');
        expect(fourthTest.firstChild.firstChild.innerHTML).toEqual('Variant A Content');
    });
});