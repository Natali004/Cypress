beforeEach(() => {
  cy.visit("/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать").should("be.visible");
});

// Список книг
const bookFirst = {
  title: "Гарри Поттер и Филосовский камень",
  description: "Мальчик, который выжил",
  author: "Джоан Роулинг",
};

const bookSecond = {
  title: "Властелин Колец",
  description: "Борьба добра со злом",
  author: "Джон Толкин",
};

const bookThird = {
  title: "Война и мир",
  description: "История о битвах и любви",
  author: "Лев Толстой",
};

describe("Favorite book spec", () => {
  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addNoFavoriteBook(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});