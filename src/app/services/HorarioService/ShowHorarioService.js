import { fn, col } from "sequelize";

import Horario from "../../models/Horario";

export default new (class ShowHorarioService {
  async run({ id }) {
    const horario = await Horario.findByPk(id, {
      attributes: [
        [fn("TO_CHAR", col("diahora"), "FMDay HH24:MI"), "diahora"],
        "professor_id",
        "materia_id",
        "turma_id",
      ],
    });

    if (!horario) {
      throw new Error("Hora de Saída não existe.");
    }

    return horario;
  }
})();
