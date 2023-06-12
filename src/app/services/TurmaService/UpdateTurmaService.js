import Turma from "../../models/Turma";
import ShowTurmaService from "./ShowTurmaService";

class UpdateTurmaService {
  async run({ id, turma, ano_id, turno_id }) {
    const request = {
      id,
      turma,
      ano_id,
      turno_id,
    };

    const turmaFound = await Turma.findByPk(id);

    const where = {
      turma: turma || turmaFound.turma,
      turno_id: turno_id || turmaFound.turno_id || null,
      ano_id: ano_id || turmaFound.ano_id || null,
    };

    // Só proíbe se existir turma com mesmo nome e turno e ano. Turmas
    // com mesmo nome em turnos diferentes é permitido
    if (where.turma && where.turno_id && where.ano_id) {
      const verifyExists = await Turma.findOne({
        where: {
          turma: where.turma,
          turno_id: where.turno_id && where.turno_id,
          ano_id: where.ano_id && where.ano_id,
        },
      });

      if (verifyExists) {
        throw new Error("Turma já existe.");
      }
    }

    await turmaFound.update(request);

    const turmaUpdated = await ShowTurmaService.run({ id });
    // // Relação Many-to-Many: Professores e Turmas
    // if (professores && professores.length > 0) {
    //   await response.setProfessores(professores);
    // }

    // // Relação Many-to-Many: Matérias e Turmas
    // if (materias && materias.length > 0) {
    //   await response.setMaterias(materias);
    // }

    return turmaUpdated;
  }
}

export default new UpdateTurmaService();
