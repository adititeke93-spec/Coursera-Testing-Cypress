// Task01Page - Simple Page Object for Search and Display Courses
class Task01Page {
  searchAndFilter(searchQuery, language, difficulty) {
    cy.get('[data-testid="search-autocomplete-input"]').type(searchQuery + '{enter}');
    cy.applyFilter('filter-dropdown-language', language);
    cy.applyFilter('filter-dropdown-productDifficultyLevel', difficulty);
  }

  displayCourses() {
    cy.get('a[data-click-key="search.search.click.search_card"]:visible').each(($course, index) => {
      if (index < 2) {
        const card = $course.closest('li');
        cy.log(`**Course ${index + 1}:** ${$course.find('h3').text().trim()} | Duration: ${card.find('.cds-CommonCard-metadata p').text().trim()} | Rating: ${card.find('span.css-4s48ix').text().trim()}`);
      }
    });
  }
}

export default new Task01Page();
