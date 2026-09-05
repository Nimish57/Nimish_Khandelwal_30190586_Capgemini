import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    usernameTextbox = () =>
        this.page.getByRole('textbox', { name: 'Enter username' });

    passwordTextbox = () =>
        this.page.getByRole('textbox', { name: 'Enter password' });

    loginButton = () =>
        this.page.getByRole('button', { name: 'LOGIN' });

    async login(username: string, password: string) {
        await this.usernameTextbox().fill(username);
        await this.passwordTextbox().fill(password);
        await this.loginButton().click();
    }
}