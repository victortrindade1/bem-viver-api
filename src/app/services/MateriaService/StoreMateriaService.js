import Materia from "../../models/Materia";

export default new (class StoreMateriaService {
  async run({ materia, professores }) {
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
      newMateria.setProfessores(professores);
    }

    return newMateria;
  }
})();
