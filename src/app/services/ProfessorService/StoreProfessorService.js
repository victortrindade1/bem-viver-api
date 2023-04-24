import { format } from "date-fns";

import Professor from "../../models/Professor";

export default new (class StoreProfessorService {
  async run({ professor_nome }) {
    const professorExists = await Professor.findOne({
      where: { professor_nome },
    });

    if (professorExists) {
      throw new Error("Professor já existe.");
    }

    const newProfessor = await Professor.create({
      professor_nome,
      ativo: true,
      profissional_data_matricula: format(new Date(), "dd/MM/yyyy"),
    });

    // // Relação Many-to-Many: Professores e Turmas
    // if (turmas && turmas.length > 0) {
    //   await newProfessor.setTurmas(turmas);
    // }

    // // Relação Many-to-Many: Professores e Matérias
    // if (materias && materias.length > 0) {
    //   await newProfessor.setMaterias(materias);
    // }

    return newProfessor;
  }
})();
