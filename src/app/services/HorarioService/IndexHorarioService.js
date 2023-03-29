import { Op, fn, col } from "sequelize";
import Horario from "../../models/Horario";

export default new (class IndexHorarioService {
  async run({ nameFilter, limit, page }) {
    const where = {};

    if (nameFilter) {
      where.diahora =
        process.env.NODE_ENV === "test" // Somente PG suporta iLike
          ? { [Op.like]: `%${nameFilter}%` }
          : { [Op.iLike]: `%${nameFilter}%` };
    }

    const total = await Horario.count({ where });

    const horarios = await Horario.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
      attributes: [
        [fn("TO_CHAR", col("diahora"), "FMDay HH24:MI"), "diahora"],
        "professor_id",
        "materia_id",
        "turma_id",
      ],
    });

    return { total, horarios };
  }
})();
