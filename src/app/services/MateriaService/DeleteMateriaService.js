import Materia from "../../models/Materia";

export default new (class DeleteMateriaService {
  async run({ id }) {
    const materia = await Materia.findByPk(id);

    if (!materia) {
      throw new Error("Matéria não existe.");
    }

    await Materia.destroy({ where: { id } });
  }
})();
