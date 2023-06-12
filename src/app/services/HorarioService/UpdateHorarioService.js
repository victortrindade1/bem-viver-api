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

    const horarioFound = await Horario.findByPk(id);

    // // Verifica se existe outro
    // const verifyExists = await Horario.findOne({
    //   where: {
    //     diahora: diahora || horarioFound.diahora,
    //     professor_id: professor_id || horarioFound.professor_id || null,
    //     materia_id: materia_id || horarioFound.materia_id || null,
    //     turma_id: turma_id || horarioFound.turma_id || null,
    //   },
    // });

    // if (verifyExists) {
    //   throw new Error("Horário já existe.");
    // }

    const horarioUpdated = await horarioFound.update(request);

    return horarioUpdated;
  }
})();
