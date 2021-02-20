describe("Create New Team Page tests", () => {
  beforeEach(() => {
    // user logins in as a manager
    cy.login("admin@example.com", "12345678");
  });

  it("manager can visit the page using sidemenu", () => {
    cy.get('[data-test-id="create-new-team-menu-item"]').click();
    cy.url().should("eq", "http://localhost:3000/create-team");
  });

  it("manager can add employee to the new team using Add button and this btn becomes disabled after adding", () => {
    cy.visit("/create-team");
    cy.get('[data-test-id="add-employee-to-new-team-btn"]').eq(0).click();
    cy.get('[data-test-id="add-employee-to-new-team-btn"]')
      .eq(0)
      .should("be.disabled");
  });

  it("manager can create new team", () => {
    // TODO make name unique
    const newTeamName = "Hooli Team 10";
    // eslint-disable-next-line no-unused-vars
    let createdTeamId;
    cy.visit("/create-team");
    // type new team name
    cy.get('[data-test-id="new-team-name-input"]').type(newTeamName);
    // add two team members
    cy.get('[data-test-id="add-employee-to-new-team-btn"]').eq(0).click();
    cy.get('[data-test-id="add-employee-to-new-team-btn"]').eq(1).click();
    // analyze
    cy.get('[data-test-id="new-team-analyze-btn"]')
      .click()
      .then(() => {
        // submit
        cy.server()
        cy.route('POST', '/api/teams').as('saveNewTeam');

        cy.get('[data-test-id="save-new-team-btn"]').click();

        // cy.wait('@saveNewTeam').its('status').should('eq', 200);
        cy.wait('@saveNewTeam').then((xhr) => {
          createdTeamId = xhr.response.body.id;
        })
        //
        cy.url().should("eq", "http://localhost:3000/teams");
        cy.contains(newTeamName);
        // TODO delete new team after test
      });
  });
});
