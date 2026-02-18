import Task01Page from '../support/pages/Task01Page';
import Task02Page from '../support/pages/Task02Page';
import Task03Page from '../support/pages/Task03Page';

describe('Coursera-Identify courses', () => {
  beforeEach(() => {
    cy.visit('https://www.coursera.org/');
    cy.viewport(1200, 900)
  });
 
  it('Task-01: Search and display 2 web development courses', () => {
    cy.fixture('task01-courses').then(({searchQuery, filters}) => {
      Task01Page.searchAndFilter(searchQuery || 'web development courses', filters?.language || 'English', filters?.difficulty || 'Beginner');
      Task01Page.displayCourses();
    });
  });
 
  it('Task-02: Extract the languages for different levels with count', () => {
    cy.fixture('task02-languages').then(({searchQuery, levels}) => {
      Task02Page.extractLanguages(searchQuery || 'Language Learning', levels);
    });
  });

  it('Task-03: Enterprise > Campus form with invalid email and capture the error message', () => {
    cy.fixture('task03-enterprise').then((form) => {
      Task03Page.navigateToEnterprise();
      Task03Page.fillForm(form);
      Task03Page.submitAndCaptureError();
    });
  });
 
});
