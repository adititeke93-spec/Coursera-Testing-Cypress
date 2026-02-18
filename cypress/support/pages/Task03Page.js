// Task03Page - Simple Page Object for Enterprise Form
class Task03Page {
  navigateToEnterprise() {
    cy.on('uncaught:exception', () => false);
    cy.contains('For Enterprise').click();
    cy.contains('For Campus').click();
    cy.contains(/Get in touch with our sales team/i).scrollIntoView();
  }

  fillForm(form) {
    cy.get('input[name="FirstName"]').type(form?.firstName || 'abc');
    cy.get('input[name="LastName"]').type(form?.lastName || 'def');
    cy.get('input[name="Email"]').type(form?.invalidEmail || 'invalid@');
    cy.get('input[name="Phone"]').type(form?.phone || '1234567890');
    cy.get('#Institution_Type__c').select(form?.institution || 'University/4 Year College');
    cy.get('input[name*="Company"]').type(form?.company || 'xyz');
    cy.get('#Title').select(form?.title || 'CEO');
    cy.get('#Department').select(form?.department || 'International');
    cy.get('#Self_Reported_Needs__c').select(form?.needs || 'Learner Support');
    cy.get('#Country').select(form?.country || 'India');
    cy.get('#State').select(form?.state || 'Goa');
  }

  submitAndCaptureError() {
    cy.contains('Submit').click({ force: true });
    cy.contains(/email/i).then((msg) => {
      cy.log('**Error Message:** ' + msg.text());
      cy.takeScreenshot('Task-03-InvalidEmailError');
    });
  }
}

export default new Task03Page();
