import Professor from "../../models/Professor";

export default new (class StoreProfessorService {
  async run({ requestData }) {
    const { professor_cpf } = requestData;

    const professorExists = await Professor.findOne({
      where: { professor_cpf },
    });

    if (professorExists) {
      throw new Error("Professor já existe.");
    }

    const newProfessor = await Professor.create(requestData);

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
