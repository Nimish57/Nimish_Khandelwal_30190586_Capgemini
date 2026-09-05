import { Page } from '@playwright/test';

export class FundsTransferPage {
    constructor(private page: Page) {}

    fundsTransferButton = () =>
        this.page.getByRole('button', { name: 'Funds Transfer' });

    addNewButton = () =>
        this.page.getByRole('button', { name: 'Add New' });

    beneficiaryNameTextbox = () =>
        this.page.getByRole('textbox', { name: 'e.g. John Doe' });

    beneficiaryAccountTextbox = () =>
        this.page.getByRole('textbox', { name: 'e.g. 1234567890' });

    saveBeneficiaryButton = () =>
        this.page.getByRole('button', { name: 'Save Beneficiary' });

    amountTextbox = () =>
        this.page.getByRole('spinbutton', { name: '0.00' });

    executeTransferButton = () =>
        this.page.getByRole('button', { name: 'Execute Transfer' });

    accountsSummaryButton = () =>
        this.page.getByRole('button', { name: 'Accounts Summary' });

    accountBalance = () =>
        this.page.locator('text=/\\$[\\d,]+\\.\\d{2}/').first();

    async openFundsTransfer() {
        await this.fundsTransferButton().click();
    }

    async addBeneficiary(name: string, accountNumber: string) {
        await this.addNewButton().click();
        await this.beneficiaryNameTextbox().fill(name);
        await this.beneficiaryAccountTextbox().fill(accountNumber);
        await this.saveBeneficiaryButton().click();
    }

    async transferFunds(amount: string) {
        await this.amountTextbox().fill(amount);
        await this.executeTransferButton().click();
    }

    async openAccountSummary() {
        await this.accountsSummaryButton().click();
    }

    async getBalance(): Promise<number> {
        const balanceText = await this.accountBalance().textContent();

        return Number(
            balanceText
                ?.replace('$', '')
                .replace(/,/g, '')
                .trim()
        );
    }
}