import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Random from '../../src/reducers/Random';
import Variant from '../../src/Variant';

describe('Random Reducer', () => {
    test('it picks a variant at random', () => {
        global.Math.random = jest.fn().mockReturnValue(0.99);
        global.Math.floor = jest.fn().mockReturnValue(1);

        const variants = [
            <Variant name="a">
                <h1>Variant A Content</h1>
            </Variant>,
            <Variant name="b">
                <h1>Variant B Content</h1>
            </Variant>,
        ];

        const result = Random()(variants);

        expect(global.Math.random).toHaveBeenCalled();
        expect(global.Math.floor).toHaveBeenCalled();
        expect(global.Math.floor).toHaveBeenCalledWith(1.98);
        expect(result?.props?.name).toEqual('b');
    });
});