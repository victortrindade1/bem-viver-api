import Turma from "../../models/Turma";

class StoreTurmaService {
  async run({ turma, ano_id, turno_id, professores, materias }) {
    const request = {
      turma,
      ano_id,
      turno_id,
    };

    const verifyExists = await Turma.findOne({
      where: {
        ano_id: ano_id || null,
        turma,
        turno_id: turno_id || null,
      },
    });

    if (verifyExists) {
      throw new Error("Turma já existe.");
    }

    const newTurma = await Turma.create(request);
    // const { id } = await Turma.create(request);

    // Relação Many-to-Many: Professores e Turmas
    if (professores && professores.length > 0) {
      await newTurma.setProfessores(professores);
    }

    // Relação Many-to-Many: Matérias e Turmas
    if (materias && materias.length > 0) {
      await newTurma.setMaterias(materias);
    }

    return newTurma;
  }
}

export default new StoreTurmaService();
