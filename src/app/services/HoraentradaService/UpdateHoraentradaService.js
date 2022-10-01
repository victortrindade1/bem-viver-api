import Horaentrada from "../../models/Horaentrada";

export default new (class UpdateHoraentradaService {
  async run({ id, horaentrada }) {
    const request = {
      id,
      horaentrada,
    };

    const horaentradaExists = await Horaentrada.findByPk(id);

    const horaentradaUpdated = await horaentradaExists.update(request);

    return horaentradaUpdated;
  }
})();
