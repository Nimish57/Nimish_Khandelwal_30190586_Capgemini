import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import { FundsTransferPage } from '../pom/FundsTransferPage';
import testData from '../data/fundTransferData.json';

test.describe('Funds Transfer', () => {

    test('Verify amount is deducted after successful transfer', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const fundsTransferPage = new FundsTransferPage(page);

        await page.goto(testData.url);

        // Login
        await loginPage.login(
            testData.username,
            testData.password
        );

        // Balance Before Transfer
        await fundsTransferPage.openAccountSummary();

        const balanceBefore =
            await fundsTransferPage.getBalance();

        console.log(`Balance Before : ${balanceBefore}`);

        // Funds Transfer
        await fundsTransferPage.openFundsTransfer();

        await fundsTransferPage.addBeneficiary(
            testData.beneficiaryName,
            testData.beneficiaryAccountNumber
        );

        await fundsTransferPage.transferFunds(
            testData.transferAmount
        );

        // Balance After Transfer
        await fundsTransferPage.openAccountSummary();

        const balanceAfter =
            await fundsTransferPage.getBalance();

        console.log(`Balance After : ${balanceAfter}`);

        const expectedBalance =
            balanceBefore - Number(testData.transferAmount);

        expect(balanceAfter).toBe(expectedBalance);

        expect(balanceAfter).toBeLessThan(balanceBefore);

        expect(balanceBefore - balanceAfter).toBe(
            Number(testData.transferAmount)
        );
    });

});






















// await page.getByRole('textbox', { name: 'Enter username' }).click();
// await page.getByRole('textbox', { name: 'Enter username' }).fill('apex_user');
// await page.getByRole('textbox', { name: 'Enter password' }).click();
// await page.getByRole('textbox', { name: 'Enter password' }).fill('Password123!');
// await page.getByRole('button', { name: 'LOGIN' }).click();
// await page.getByRole('button', { name: 'Funds Transfer' }).click();
// await page.getByRole('button', { name: 'Add New' }).click();
// await page.getByRole('textbox', { name: 'e.g. John Doe' }).click();
// await page.getByRole('textbox', { name: 'e.g. John Doe' }).fill('Hemlo');
// await page.getByRole('textbox', { name: 'e.g. 1234567890' }).click();
// await page.getByRole('textbox', { name: 'e.g. 1234567890' }).fill('1111111111');
// await page.getByRole('button', { name: 'Save Beneficiary' }).click();
// await page.getByRole('spinbutton', { name: '0.00' }).click();
// await page.getByRole('spinbutton', { name: '0.00' }).fill('1500');
// await page.getByRole('button', { name: 'Execute Transfer' }).click();
// await page.getByRole('button', { name: 'Accounts Summary' }).click();
// await page.getByText('$19,900.00').click();
// await page.getByRole('spinbutton', { name: '0.00' }).click();
// await page.getByRole('spinbutton', { name: '0.00' }).fill('989');
// await page.getByText('$2,750.00').click();
// await page.getByText('$19,900.00').click();




// await page.getByRole('spinbutton', { name: '0.00' }).click();
// await page.getByRole('spinbutton', { name: '0.00' }).fill('10000');





// await page.getByRole('textbox', { name: 'Enter username' }).click();
// await page.getByRole('textbox', { name: 'Enter username' }).fill('apex_user');
// await page.getByRole('textbox', { name: 'Enter password' }).click();
// await page.getByRole('textbox', { name: 'Enter password' }).fill('Password123!');
// await page.getByRole('button', { name: 'LOGIN' }).click();
// await page.getByRole('button', { name: 'Funds Transfer' }).click();
// await page.getByRole('spinbutton', { name: '0.00' }).click();
// await page.getByRole('spinbutton', { name: '0.00' }).fill('800');
// await page.getByRole('button', { name: 'Execute Transfer' }).click();
// await page.getByRole('button', { name: 'Accounts Summary' }).click();