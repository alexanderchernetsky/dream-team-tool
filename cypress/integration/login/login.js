describe("Login tests", () => {
  it("trying to visit the homepage without auth token will redirect to the /login page", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("after attempt to login without credentials validation messages will appear", () => {
    cy.contains("Submit").click();
    cy.contains("Please input your email!");
    cy.contains("Please input your password!");
  });

  it("after attempt to login with wrong credentials popup with error message will appear", () => {
    cy.get('[data-test-id="login-email"]').type("some_wrong_login@example.com");
    cy.get('[data-test-id="login-password"]').type("wrong_password");
    cy.contains("Submit").click();
    cy.contains("Request failed");
  });

  it("after typing correct credentials and clicking Submit, should redirect to the Homepage and set data to the localStorage", () => {
    cy.get('[data-test-id="login-email"]').type("admin@example.com");
    cy.get('[data-test-id="login-password"]').type("12345678");
    cy.contains("Submit").click();
    // we have to use .then otherwise assertions with expect would fail because cypress executes asynchronously
    cy.url()
      .should("eq", "http://localhost:3000/")
      .then(() => {
        expect(localStorage.getItem("token")).to.not.be.null;
        expect(localStorage.getItem("user")).to.not.be.null;
      });
  });
});
