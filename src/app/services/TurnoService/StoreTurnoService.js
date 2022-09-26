import Turno from "../../models/Turno";

class StoreTurnoService {
  async run({ turno }) {
    const turnoExists = await Turno.findOne({
      where: { turno },
    });

    if (turnoExists) {
      throw new Error("Turno já existe.");
    }

    const request = {
      turno,
    };

    const { id } = await Turno.create(request);

    return id;
  }
}

export default new StoreTurnoService();
