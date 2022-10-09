import Materia from "../../models/Materia";

export default new (class StoreMateriaService {
  async run({ materia, professores, turmas }) {
    const materiaExists = await Materia.findOne({
      where: { materia },
    });

    if (materiaExists) {
      throw new Error("Matéria já existe.");
    }

    const request = {
      materia,
    };

    const newMateria = await Materia.create(request);

    // Relação Many-to-Many: Professores e Matérias
    if (professores && professores.length > 0) {
      await newMateria.setProfessores(professores);
    }

    // Relação Many-to-Many: Turmas e Matérias
    if (turmas && turmas.length > 0) {
      await newMateria.setTurmas(turmas);
    }

    return newMateria;
  }
})();
