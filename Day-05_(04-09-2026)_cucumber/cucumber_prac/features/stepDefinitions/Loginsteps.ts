// import { Given, When, Then } from '@cucumber/cucumber';
// import { LoginPage } from '../../pages/loginPage';
// import { CustomWorld } from '../../support/world';

// let loginPage: LoginPage;

// Given('the user is on the login page', async function (this: CustomWorld) {
//   // Write code here that turns the phrase above into concrete actions
//   loginPage = new LoginPage(this.page);
//   return loginPage.openApp();
// });

// When('the user enters valid credentials', async function (this: CustomWorld) {
//   // Write code here that turns the phrase above into concrete actions
//   return loginPage.login();
// });

// When('clicks the login button', async function (this: CustomWorld) {
//   // Write code here that turns the phrase above into concrete actions
//   return loginPage.login();
// });

// Then('the user should be redirected to the dashboard', async function (this: CustomWorld) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// When('the user enters invalid credentials', async function (this: CustomWorld) {
//   // Write code here that turns the phrase above into concrete actions
//   await loginPage.fillcredentials();
//   await loginPage.login();
// });

// Then('an error message should be displayed', async function (this: CustomWorld) {
//   // Write code here that turns the phrase above into concrete actions
//   await loginPage.checkerror();
// });
    
// import {Given,When,Then} from '@cucumber/cucumber';
// import {LoginPage} from '../../pages/loginPage'
// import {CustomWorld} from '../../support/world'
 
 
// let login : LoginPage;

// Given('User opens the application', async function (this:CustomWorld) {

//     login = new LoginPage(this.page);
//     await login.openApp();       
// });
       

       
// When('User enters credentails', async function (this:CustomWorld){

//      await login.login(); 
// });
       

       
// Then('User should login successfully',async function (this:CustomWorld) {
  
//     console.log("Login successfully")      
// });

// When('User enters {string} and {string}', async  function (string, string2) {

//     await login.loginwithmultipleusers(string,string2);
          
// });
       
// Then('User should view the error message', function () {

//     console.log("error displayed");
          
// });

import {Given,When,Then} from '@cucumber/cucumber';
import {LoginPage} from '../../pages/loginPage'
import {CustomWorld} from '../../support/world'
 
let login : LoginPage;
Given('User opens the application', async function (this:CustomWorld) {
 
    login = new LoginPage(this.page);
    await login.openApp();       
});
When('User enters credentails', async function (this:CustomWorld){
 
     await login.login();
});
 
Then('User should login successfully',async function (this:CustomWorld) {
  
    console.log("Login successfully")      
});
 
 
 
// When('User enters invalid  credentails', async function (this:CustomWorld){
 
//      await login.loginWithInvalidCredentails()
// });
 
When('clicks  the login button', async function (this:CustomWorld){
 
     await login.clickButton()
});
 
Then('the user should see an error message', async function (this:CustomWorld) {
    console.log("error displayed");
    await login.errorcheck();

});
When('User enters username {string} and password {string}', async function (this:CustomWorld, string, string2) {
  // Write code here that turns the phrase above into concrete actions
  await login.loginwithmultipleusers(string,string2);
});