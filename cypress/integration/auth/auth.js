import Manager from "../../../src/services/Manager";
import {getToken} from "../../../src/helpers/authentication";

describe('login', () => {
    it('logs in programmatically without using the UI', () => {
        cy.request('POST', 'https://dream-team-api.bubeha.com/api/login', {
            email: "admin@example.com",
            password: "12345678"
        }).then(response => {
            console.log(response);
            const token = response?.body?.access_token;
            console.log("token", token);
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(response?.body?.user));
            Manager.setAuthHeader(`Bearer ${getToken()}`);
        });

        cy.visit('/')
    });
})
