import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Experiment from '../src/Experiment';
import Variant from '../src/Variant';
import Cache from '../src/Cache';

const mockReducer = (index = 0) => variants => variants[index];

beforeEach(() => {
    global.Storage.prototype.setItem = jest.fn();
    global.Storage.prototype.getItem = jest.fn();
});

describe('Cache', () => {
    it('caches the chosen variant', () => {
        render(
            <Experiment name="test" reducer={mockReducer()} cache={Cache()}>
                <Variant name="a">
                    <h1>Variant A Content</h1>
                </Variant>
                <Variant name="b">
                    <h1>Variant B Content</h1>
                </Variant>
            </Experiment>
        );

        expect(global.Storage.prototype.setItem).toHaveBeenCalled();
        expect(global.Storage.prototype.setItem).toHaveBeenCalledWith('exp_test_variant', 'a');
    });

    it('retrieves the cached variant', () => {
        global.Storage.prototype.getItem = jest.fn().mockReturnValue('b');

        render(
            <Experiment name="test" reducer={mockReducer()} cache={Cache()}>
                <Variant name="a">
                    <h1>Variant A Content</h1>
                </Variant>
                <Variant name="b">
                    <h1>Variant B Content</h1>
                </Variant>
            </Experiment>
        );

        expect(global.Storage.prototype.getItem).toHaveBeenCalled();
        expect(global.Storage.prototype.getItem).toHaveBeenCalledWith('exp_test_variant');
        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('heading').innerHTML).toEqual('Variant B Content');
    });
});