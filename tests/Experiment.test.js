import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Experiment from '../src/Experiment';
import Variant from '../src/Variant';

const mockReducer = (index = 0) => variants => variants[index];
const mockCache = () => (experiment, variants, reducer) => reducer(variants);

describe('Experiment', () => {
    test('it renders', () => {
        const { container } = render(
            <Experiment
                name="test"
                reducer={mockReducer()}
                cache={mockCache()}
            >
                <Variant name="a">
                    <h1>Variant A Content</h1>
                </Variant>
                <Variant name="b">
                    <h1>Variant B Content</h1>
                </Variant>
            </Experiment>
        );

        expect(container.firstChild).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('experiment');
        expect(container.firstChild).toHaveAttribute('id', 'exp_test');
        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('heading').innerHTML).toEqual('Variant A Content');
    });

    test('it can show a different variant', () => {
        render(
            <Experiment
                name="test"
                reducer={mockReducer(1)}
                cache={mockCache()}
            >
                <Variant name="a">
                    <h1>Variant A Content</h1>
                </Variant>
                <Variant name="b">
                    <h1>Variant B Content</h1>
                </Variant>
            </Experiment>
        );

        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('heading').innerHTML).toEqual('Variant B Content');
    });

    test('it runs the reducer', () => {
        const mockReducer = jest.fn();

        render(
            <Experiment
                name="test"
                reducer={mockReducer}
                cache={mockCache()}
            >
                <Variant name="a">
                    <h1>Variant A Content</h1>
                </Variant>
                <Variant name="b">
                    <h1>Variant B Content</h1>
                </Variant>
            </Experiment>
        );

        expect(mockReducer).toHaveBeenCalled();
    });

    test('it checks the cache', () => {
        const mockCache = jest.fn();

        render(
            <Experiment
                name="test"
                reducer={mockReducer()}
                cache={mockCache}
            >
                <Variant name="a">
                    <h1>Variant A Content</h1>
                </Variant>
                <Variant name="b">
                    <h1>Variant B Content</h1>
                </Variant>
            </Experiment>
        );

        expect(mockCache).toHaveBeenCalled();
    });
});