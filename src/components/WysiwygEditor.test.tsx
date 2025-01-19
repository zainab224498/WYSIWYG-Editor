import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WysiwygEditor from './WysiwygEditor';

describe('WysiwygEditor', () => {
    test('renders toolbar buttons', () => {
        const { getByText } = render(<WysiwygEditor />);
        expect(getByText('Bold')).toBeInTheDocument();
        expect(getByText('Italic')).toBeInTheDocument();
        expect(getByText('Underline')).toBeInTheDocument();
    });

    test('applies bold style', () => {
        const { getByText } = render(<WysiwygEditor />);
        const boldButton = getByText('Bold');
        fireEvent.mouseDown(boldButton);
        // Add assertions to check if the bold style is applied
    });
});