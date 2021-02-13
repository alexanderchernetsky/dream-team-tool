import React from 'react';
import { createMemoryHistory } from 'history';
import {Router, BrowserRouter} from "react-router-dom";
import {fireEvent, render} from '@testing-library/react';

import MenuItemComponent from "./MenuItemComponent";

describe('MenuItemComponent', () => {
    it('renders component with default slug and icons if no props provided', () => {
        const {getByText, getByTestId} = render(
            <BrowserRouter>
                <MenuItemComponent linkTo="/"/>
            </BrowserRouter>
        );

        expect(getByText('Menu Item')).toBeInTheDocument();
        expect(getByTestId('folder-icon')).toBeInTheDocument();
    });

    it('onClick changes route to provided with linkTo prop', () => {
        const history = createMemoryHistory({
            initialEntries: ['/starting/point']
        });

        const testRoute = "/some-route";

        const {getByTestId} = render(
            <Router history={history}>
                <MenuItemComponent linkTo={testRoute} dataTestId="menu-item" />
            </Router>
        );

        expect(history.location.pathname).toEqual('/starting/point');

        fireEvent.click(getByTestId('menu-item'));

        expect(history.location.pathname).toEqual(testRoute);
    })
})
