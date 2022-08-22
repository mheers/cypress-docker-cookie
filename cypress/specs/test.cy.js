describe("setCookie", () => {
    it("does not like docker services", () => {
        cy.visit("/");
        cy.get('a').contains('API').click();
        // cy.setCookie("hello", "world");
        cy.get('ul > li').contains('username').should('exist');
    });
});
