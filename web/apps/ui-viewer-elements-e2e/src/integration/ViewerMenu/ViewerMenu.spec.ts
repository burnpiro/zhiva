describe('ui-viewer-elements: ViewerMenu component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=viewermenu--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to ViewerMenu!');
    });
});
