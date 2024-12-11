# Playwright Cucumber Project

This is a **Playwright** testing project integrated with **Cucumber** for behavior-driven development (BDD) testing. 
The project is designed to automate end-to-end tests for web applications.

## What's inside
- Launching of default Chromium Playwright browser before running all tests
- Basic report generation - Cucumber Json/Html reporters
- Utilies function to help you with writing steps
- Ability to run in CI via github actions

## What can be done better 
- Ability to use baseURL from config - couldn't workout how to do that
- Intercept api's or poll for page load to complete
- Not using cucumber would have made the more framework flexible - it would be an overhead to maintain

## Installation
Clone the repo

```bash
git clone https://github.com/tjacob0101/PlaywrightDemo.git
```

Use the package manager npm to install foobar.

```bash
npm install
```

## Run cucumber tests
```bash
npm run test
```
