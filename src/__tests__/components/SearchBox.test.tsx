import {render, screen } from '@testing-library/react';

import SearchBox from '../../components/SearchBox';
import useFetch from '../../hooks/useFetch';

const mockedUseFetch = useFetch as jest.Mock<[]>;
const noItemMessage = jest.fn();
const errorMessage = jest.fn();
const searchProps = {
    id: 'search',
    name: 'search',
    label: "Search for any Brewery, Eg: brew",
    placeholder: "Enter a search item...",
    maxItems:5,
    debounceWait:400,
    noItemMessage,
    errorMessage
};

// Have not completed this test file. We may need to add more tests by mocking the api calls.
describe('SearchBox Tests', () => {

    it('SearchBox component renders successfully', async () => {
        render(<SearchBox {...searchProps}/>);
        const label = screen.getByText(/Search for any Brewery, Eg: brew/i);
        expect(label).toBeInTheDocument();
    });

});
