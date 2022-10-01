import Turno from "../../models/Turno";

export default new (class ShowTurnoService {
  async run({ id }) {
    const turno = await Turno.findByPk(id, {});

    if (!turno) {
      throw new Error("Turno não existe.");
    }

    return turno;
  }
})();
