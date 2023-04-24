import ProfessorMateria from "../models/ProfessorMateria";

class ProfessorMateriaController {
  async delete(req, res) {
    try {
      const { id } = req.params;

      const professorMateria = await ProfessorMateria.findByPk(id);

      if (!professorMateria) {
        throw new Error("Relação professor-matéria não existe.");
      }

      await ProfessorMateria.destroy({ where: { id } });

      return res
        .status(200)
        .json({ message: "Relação professor-matéria excluída com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new ProfessorMateriaController();
