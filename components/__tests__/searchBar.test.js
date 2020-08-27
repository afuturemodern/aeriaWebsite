import { render, screen, getByPlaceholderText } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import Searchbar from "../searchBar";

describe("searchBar", () => {
    it("renders without crashing", () => {
        const div = document.createElement('div')
        render(<Searchbar />, div);

    });
    it('input has a prop type with value text', () => {
        const { getByPlaceholderText } = render(<Searchbar />)
        // screen.debug()
        expect(getByPlaceholderText('enter artist name')).toBeVisible()
    })
});