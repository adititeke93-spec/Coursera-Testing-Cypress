// Task02Page - Simple Page Object for Extract Languages by Level
class Task02Page {
  extractLanguages(searchQuery, levels = []) {
    const data = {};
    const levelList = levels.length ? levels : ["Beginner", "Intermediate", "Advanced", "Mixed"];
    const selectors = {
      searchInput: '[data-testid="search-autocomplete-input"]',
      levelDropdown: '[data-testid="filter-dropdown-productDifficultyLevel"]',
      levelCheckbox: '.cds-checkboxAndRadio-label input[type="checkbox"]',
      viewBtn: '[data-testid="filter-view-button"]',
      langDropdown: '[data-testid="filter-dropdown-language"]',
      langList: '.cds-formGroup-groupWrapper .css-ksf52d',
      langText: 'div span span',
    };

    cy.get(selectors.searchInput, { timeout: 15000 }).should('not.be.disabled').type(`${searchQuery}{enter}`, { force: true });
    cy.wait(2000);
    cy.get(selectors.levelDropdown).click();

    levelList.forEach((level, idx) => {
      data[level] = [];
      cy.get(selectors.levelCheckbox).eq(idx).check().wait(2000);
      cy.get(selectors.viewBtn).click();
      cy.get(selectors.langDropdown).click();
      cy.get(selectors.langList).each($el => {
        cy.wrap($el).find(selectors.langText).invoke('text').then(text => {
          const match = text.match(/^([A-Za-z]+).*?\(([,\d]+)\)$/);
          if (match) data[level].push({ [match[1]]: parseInt(match[2].replace(/,/g, '')) });
        });
      }).then(() => cy.log(`✅ ${level}: ${JSON.stringify(data[level])}`));
      cy.get(selectors.viewBtn).click();
      cy.get(selectors.levelDropdown).click();
      cy.get(selectors.levelCheckbox).eq(idx).uncheck();
    });
  }
}

export default new Task02Page();
