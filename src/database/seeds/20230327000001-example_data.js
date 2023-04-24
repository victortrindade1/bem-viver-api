module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("sistemas", [
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

    const sistemas = await queryInterface.sequelize.query(
      `SELECT id from SISTEMAS;`
    );

    const sistemasRows = sistemas[0];

    await queryInterface.bulkInsert("anos", [
      {
        ano: "Maternal I",
        sistema_id: sistemasRows[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        ano: "1ª série",
        sistema_id: sistemasRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        ano: "2ª série",
        sistema_id: sistemasRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const anos = await queryInterface.sequelize.query(`SELECT id from ANOS;`);

    const anosRows = anos[0];

    await queryInterface.bulkInsert("turnos", [
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

    const turnos = await queryInterface.sequelize.query(
      `SELECT id from TURNOS;`
    );

    const turnosRows = turnos[0];

    await queryInterface.bulkInsert("turmas", [
      {
        turma: "108",
        ano_id: anosRows[0].id,
        turno_id: turnosRows[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turma: "109",
        ano_id: anosRows[1].id,
        turno_id: turnosRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        turma: "201",
        ano_id: anosRows[2].id,
        turno_id: turnosRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const turmas = await queryInterface.sequelize.query(
      `SELECT id from TURMAS;`
    );

    const turmasRows = turmas[0];

    await queryInterface.bulkInsert("materias", [
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

    const materias = await queryInterface.sequelize.query(
      `SELECT id from MATERIAS;`
    );

    const materiasRows = materias[0];

    await queryInterface.bulkInsert("professores", [
      {
        professor_nome: "Prof Girafales",
        professor_cpf: "123387",
        ativo: true,
        // turmas: [2],
        // materias: [2, 3],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_nome: "Dona Florinda",
        professor_cpf: "123389",
        ativo: true,
        // turmas: [1, 2],
        // materias: [1, 2, 3],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const professores = await queryInterface.sequelize.query(
      `SELECT id from PROFESSORES;`
    );

    const professoresRows = professores[0];

    await queryInterface.bulkInsert("professores_materias", [
      {
        professor_id: professoresRows[0].id,
        materia_id: materiasRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_id: professoresRows[1].id,
        materia_id: materiasRows[2].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        professor_id: professoresRows[1].id,
        materia_id: materiasRows[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("horarios", [
      {
        diahora: "1996-01-01T07:00:00Z",
        professor_id: professoresRows[0].id,
        turma_id: turmasRows[1].id,
        materia_id: materiasRows[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        diahora: "1996-01-01T07:50:00Z",
        professor_id: professoresRows[1].id,
        turma_id: turmasRows[0].id,
        materia_id: materiasRows[2].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("horaentradas", [
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

    await queryInterface.bulkInsert("horasaidas", [
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

    await queryInterface.bulkInsert("periodos", [
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

    await queryInterface.bulkInsert("alunos", [
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
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("sistemas", null, {});
    await queryInterface.bulkDelete("anos", null, {});
    await queryInterface.bulkDelete("turnos", null, {});
    await queryInterface.bulkDelete("turmas", null, {});
    await queryInterface.bulkDelete("materias", null, {});
    await queryInterface.bulkDelete("professores", null, {});
    await queryInterface.bulkDelete("professores_materias", null, {});
    await queryInterface.bulkDelete("horarios", null, {});
    await queryInterface.bulkDelete("horaentradas", null, {});
    await queryInterface.bulkDelete("horasaidas", null, {});
    await queryInterface.bulkDelete("periodos", null, {});
    await queryInterface.bulkDelete("alunos", null, {});
  },
};
