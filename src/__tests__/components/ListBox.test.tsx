import { render, screen } from '@testing-library/react';

import ListBox from '../../components/ListBox';

const listBoxProps = {
    items: [{
        id: 1,
        name:'Test Brew'
    }],
    activeIndex: 0
};

describe('ListBox Tests', () => {

    it('renders successfully', async () => {
        render(<ListBox {...listBoxProps}/>);
        const ulElement = screen.getByTestId('listBox');
        expect(ulElement).toBeInTheDocument();
        expect(ulElement.firstChild).toHaveClass('listBoxItem active');
    });

    it('renders the list items successfully', async () => {
        render(<ListBox {...listBoxProps}/>);
        expect(screen.getByText('Test Brew')).toBeInTheDocument();
    });

    it('renders the list items without active class names', async () => {
        const updatedProps = {...listBoxProps, activeIndex: ''}
        render(<ListBox {...updatedProps}/>);
        const ulElement = screen.getByTestId('listBox');
        expect(ulElement.firstChild).toHaveClass('listBoxItem');
    });

});
