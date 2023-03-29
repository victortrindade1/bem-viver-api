import Horario from "../../models/Horario";

export default new (class DeleteHorarioService {
  async run({ id }) {
    const horario = await Horario.findByPk(id);

    if (!horario) {
      throw new Error("Horário não existe.");
    }

    await Horario.destroy({ where: { id } });
  }
})();
