import StoreMateriaService from "../services/MateriaService/StoreMateriaService";
import UpdateMateriaService from "../services/MateriaService/UpdateMateriaService";
import IndexMateriaService from "../services/MateriaService/IndexMateriaService";
import DeleteMateriaService from "../services/MateriaService/DeleteMateriaService";
import ShowMateriaService from "../services/MateriaService/ShowMateriaService";

class MateriaController {
  async store(req, res) {
    try {
      const { materia, professores, turmas } = req.body;

      const newMateria = await StoreMateriaService.run({
        materia,
        professores,
        turmas,
      });

      return res.json(newMateria);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const { materia, professores, turmas } = req.body;
      const { id } = req.params;

      const materiaUpdated = await UpdateMateriaService.run({
        id,
        materia,
        professores,
        turmas,
      });

      return res.json(materiaUpdated);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: nameFilter, limit = 5, complete = true } = req.query;

      const { total, materias } = await IndexMateriaService.run({
        nameFilter,
        limit,
        page,
        complete,
      });

      return res.json({
        limit,
        page: Number(page),
        items: materias,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await DeleteMateriaService.run({ id });

      return res.status(200).json({ message: "Matéria excluída com sucesso." });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const materia = await ShowMateriaService.run({ id });

      return res.json(materia);
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
}

export default new MateriaController();
