import Horario from "../../models/Horario";

export default new (class UpdateHorarioService {
  async run({ id, diahora, professor_id, materia_id, turma_id }) {
    const request = {
      id,
      diahora,
      professor_id,
      materia_id,
      turma_id,
    };

    const horarioExists = await Horario.findByPk(id);

    const horarioUpdated = await horarioExists.update(request);

    return horarioUpdated;
  }
})();
