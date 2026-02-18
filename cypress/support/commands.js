/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

// ============================================
// CUSTOM COMMANDS FOR COURSERA AUTOMATION
// ============================================

/**
 * Apply filter with option
 * @param {string} testId - The filter data-testid
 * @param {string} optionText - The option text to select
 */
Cypress.Commands.add('applyFilter', (testId, optionText) => {
  cy.get(`[data-testid="${testId}"]`).click({ force: true });
  cy.contains('label', optionText, { timeout: 10000 }).click({ force: true });
  cy.get('body').then(($body) => {
    const $btn = $body.find('button').filter((_, b) => /view results|apply|done|show results/i.test(b.innerText));
    if ($btn.length) {
      cy.wrap($btn).first().click({ force: true });
    } else {
      cy.get('body').type('{esc}');
    }
  });
  cy.log(`✅ Applied filter: ${testId} = ${optionText}`);
});

/**
 * Take screenshot with custom name
 * @param {string} name - Name for the screenshot
 */
Cypress.Commands.add('takeScreenshot', (name) => {
  const timestamp = new Date().toLocaleTimeString();
  cy.screenshot(`${name}-${timestamp}`, { capture: 'viewport' });
  cy.log(`📸 Screenshot taken: ${name}`);
});