import Horario from "../../models/Horario";

export default new (class StoreHorarioService {
  async run({ diahora, professor_id, materia_id, turma_id }) {
    const diahoraExists = await Horario.findOne({
      where: { diahora, professor_id, materia_id, turma_id },
    });

    if (diahoraExists) {
      throw new Error("Hora de saída já existe.");
    }

    const request = {
      diahora,
      professor_id,
      materia_id,
      turma_id,
    };

    const { id } = await Horario.create(request);

    return id;
  }
})();
