describe('ui-studies-list: UiStudiesList component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=uistudieslist--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to UiStudiesList!');
    });
});
