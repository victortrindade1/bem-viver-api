import Horasaida from "../../models/Horasaida";

export default new (class UpdateHorasaidaService {
  async run({ id, horasaida }) {
    const request = {
      id,
      horasaida,
    };

    const horasaidaExists = await Horasaida.findByPk(id);

    const horasaidaUpdated = await horasaidaExists.update(request);

    return horasaidaUpdated;
  }
})();
