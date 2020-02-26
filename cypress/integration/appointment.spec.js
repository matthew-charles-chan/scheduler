/* eslint-disable no-undef */
describe("appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // click add
    cy.get("[alt=Add]")
      .first()
      .click();

    // enter student name:  Mathew Chan
    cy.get("[data-testid=student-name-input]").type("Matthew Chan");

    //Select interviewer
    cy.get("[alt='Tori Malcolm']").click();

    //click save button
    cy.contains("Save").click();

    //check that student and interviewer are saved
    cy.contains(".appointment__card--show", "Matthew Chan");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("Should edit an interview", () => {
    //click edit
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("HoHo Hoang");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "HoHo Hoang");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
      
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});