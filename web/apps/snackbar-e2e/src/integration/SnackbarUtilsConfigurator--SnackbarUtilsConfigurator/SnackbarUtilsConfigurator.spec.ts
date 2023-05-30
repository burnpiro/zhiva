describe('snackbar: SnackbarUtilsConfigurator component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=snackbarutilsconfigurator--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to SnackbarUtilsConfigurator!');
  });
});
