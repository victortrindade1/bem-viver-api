import Turno from "../../models/Turno";

class UpdateTurnoService {
  async run({ id, turno }) {
    const request = {
      id,
      turno,
    };

    const turnoExists = await Turno.findByPk(id);

    const turnoUpdated = await turnoExists.update(request);

    return turnoUpdated;
  }
}

export default new UpdateTurnoService();
