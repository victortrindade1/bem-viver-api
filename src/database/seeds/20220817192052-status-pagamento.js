module.exports = {
  up: (QueryInterface) =>
    QueryInterface.bulkInsert(
      "statuspagamentos",
      [
        {
          statuspagamento: "Sem Pgto",
        },
        {
          statuspagamento: "Deve",
        },
        {
          statuspagamento: "Quitado",
        },
        {
          statuspagamento: "Inativo",
        },
        {
          statuspagamento: "Pré-Matr.",
        },
      ],
      {}
    ),

  down: () => {},
};
