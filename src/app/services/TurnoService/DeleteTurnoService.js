import Turno from "../../models/Turno";

class DeleteTurnoService {
  async run({ id }) {
    const turno = await Turno.findByPk(id);

    if (!turno) {
      throw new Error("Turno não existe.");
    }

    await Turno.destroy({ where: { id } });
  }
}

export default new DeleteTurnoService();
