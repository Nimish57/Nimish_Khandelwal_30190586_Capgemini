import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { StudentRegistrationPage } from '../../pages/studentregistrationPage';

let registrationPage: StudentRegistrationPage;

Given(
    'User opens the registration application',
    async function (this: CustomWorld) {

        registrationPage =
            new StudentRegistrationPage(this.page);

        await registrationPage.openApplication();
    }
);

When(
    'User enters registration details {string} {string} {string} {string} {string} {string} {string} {string}',
    async function (
        this: CustomWorld,
        name: string,
        email: string,
        mobile: string,
        dob: string,
        subject: string,
        address: string,
        state: string,
        city: string
    ) {

        await registrationPage.fillStudentRegistrationForm(
            name,
            email,
            mobile,
            dob,
            subject,
            address,
            state,
            city
        );

        await registrationPage.clickSubmit();
    }
);
Then(
    'Registration should be completed successfully',
    async function (this: CustomWorld) {

        await registrationPage.enabledloginbtn();
    }
);
