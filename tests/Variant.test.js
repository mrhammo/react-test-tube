import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Variant from '../src/Variant';

describe('Variant', () => {
    test('it renders', () => {
        const { container } = render(
            <Variant name="a">
                <h1>Variant Content</h1>
            </Variant>
        );

        expect(container.firstChild).toBeInTheDocument();
        expect(container.firstChild).toHaveClass('experiment_variant');
        expect(container.firstChild).toHaveAttribute('id', 'var_a');
        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByRole('heading').innerHTML).toEqual('Variant Content');
    });
});