module.exports = {
  up: async (QueryInterface) => {
    await QueryInterface.bulkInsert("sistemas", [
      {
        sistema: "Infantil",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sistema: "Fundamental",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("anos", [
      {
        ano: "Maternal I",
        sistema_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        ano: "1ª série",
        sistema_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        ano: "2ª série",
        sistema_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("turnos", [
      {
        turno: "Diurno",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turno: "Integral",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("turmas", [
      {
        turma: "108",
        ano_id: 2,
        turno_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turma: "109",
        ano_id: 2,
        turno_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turma: "201",
        ano_id: 3,
        turno_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("materias", [
      {
        materia: "Ciências",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        materia: "Geografia",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        materia: "Matemática",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("professores", [
      {
        professor_nome: "Prof Girafales",
        professor_cpf: "123387",
        // turmas: [2],
        // materias: [2, 3],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_nome: "Dona Florinda",
        professor_cpf: "123389",
        // turmas: [1, 2],
        // materias: [1, 2, 3],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("professores_turmas", [
      {
        professor_id: 1,
        turma_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_id: 2,
        turma_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_id: 2,
        turma_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("professores_materias", [
      {
        professor_id: 1,
        materia_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_id: 2,
        materia_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_id: 2,
        materia_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("turmas_materias", [
      {
        turma_id: 1,
        materia_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turma_id: 2,
        materia_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turma_id: 2,
        materia_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("horarios", [
      {
        diahora: "1996-01-01T07:00:00Z",
        professor_id: 1,
        materia_id: 1,
        turma_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        diahora: "1996-01-01T07:50:00Z",
        professor_id: 1,
        materia_id: 1,
        turma_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("horaentradas", [
      {
        horaentrada: "07:00h",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        horaentrada: "13:00h",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("horasaidas", [
      {
        horasaida: "12:00h",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        horasaida: "18:00h",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("periodos", [
      {
        periodo: "4 horas",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        periodo: "12 horas",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await QueryInterface.bulkInsert("alunos", [
      {
        dados_escolares_data_matricula: "13/02/2023",
        dados_escolares_data_pre_matricula: null,
        dados_pessoais_data_nascimento: "12/02/1992",
        matricula: "20251",
        nome: "Victor Azeredo Trindade",
        ativo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        dados_escolares_data_matricula: "13/02/2023",
        dados_escolares_data_pre_matricula: null,
        dados_pessoais_data_nascimento: "12/02/1992",
        matricula: "20252",
        nome: "Severino Savarina",
        ativo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: () => {},
};
