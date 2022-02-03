describe("setCookie", () => {
    it("does not like docker services", () => {
        cy.setCookie("hello", "world");
    });
});
