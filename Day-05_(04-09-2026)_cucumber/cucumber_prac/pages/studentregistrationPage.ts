import { Page, expect } from '@playwright/test';

export class StudentRegistrationPage {

    constructor(private page: Page) {}

    async openApplication() {

        await this.page.goto(
            'https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php'
        );

        await this.page.waitForLoadState('networkidle');
    }

    async fillStudentRegistrationForm(
        name: string,
        email: string,
        mobile: string,
        dob: string,
        subject: string,
        address: string,
        state: string,
        city: string
    ) {

        await this.page.getByRole('textbox', { name: 'Name:' }).fill(name);

        await this.page.getByRole('textbox', { name: 'Email:' }).fill(email);

        await this.page.getByRole('radio', { name: 'Gender:' }).check();

        await this.page.getByRole('textbox', {name: 'Mobile(10 Digits):'}).fill(mobile);

        await this.page.getByRole('textbox', {name: 'Date of Birth:'}).fill(dob);

        await this.page.getByRole('textbox', {name: 'Subjects:'}).fill(subject);

        // Hobbies Checkbox
        await this.page.getByRole('checkbox').nth(1).check();

        await this.page
            .getByRole('textbox', {
                name: 'Currend Address'
            })
            .fill(address);

        await this.page.locator('#state').selectOption(state);

        await this.page.locator('#city').selectOption(city);
    }

    async clickSubmit() {

        await this.page.locator('input[type="submit"]').click();
    }

    async registerStudent(
        name: string,
        email: string,
        mobile: string,
        dob: string,
        subject: string,
        address: string,
        state: string,
        city: string
    ) {

        await this.fillStudentRegistrationForm(
            name,
            email,
            mobile,
            dob,
            subject,
            address,
            state,
            city
        );

        await this.clickSubmit();
    }
    async enabledloginbtn() {
        await expect(this.page.locator('input[type="submit"]')).toBeEnabled();
    }
}




