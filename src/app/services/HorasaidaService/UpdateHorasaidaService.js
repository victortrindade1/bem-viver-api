import Horasaida from "../../models/Horasaida";

export default new (class UpdateHorasaidaService {
  async run({ id, horasaida }) {
    const request = {
      id,
      horasaida,
    };

    const horasaidaFound = await Horasaida.findByPk(id);

    // Verifica se existe outro com este nome
    const verifyExists = await Horasaida.findOne({
      where: {
        horasaida: horasaida || horasaidaFound.horasaida,
      },
    });

    if (verifyExists) {
      throw new Error("Hora de Saída já existe.");
    }

    const horasaidaUpdated = await horasaidaFound.update(request);

    return horasaidaUpdated;
  }
})();
