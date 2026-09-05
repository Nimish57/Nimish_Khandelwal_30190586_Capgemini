
Feature: Login
 
    Login functinality validation
 
@smoke,@regression
Scenario: Verify login with valid credentails
Given User opens the application
When User enters credentails
Then User should login successfully

Scenario Outline: Verify login with multiple users
Given User opens the application
When User enters username "<username>" and password "<password>"
Then the user should see an error message

Examples:

            | username | password |
            | standard_user | secret_sauce |
            | locked_out_user | secret_sauc |
            | problem_user | secret_sauc |
            | performance_glitch_user | secret_sauc |
            | error_user | secret_sauc |
            | visual_user | secret_sauc |
