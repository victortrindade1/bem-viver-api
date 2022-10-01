import Horasaida from "../../models/Horasaida";

export default new (class StoreHorasaidaService {
  async run({ horasaida }) {
    const horasaidaExists = await Horasaida.findOne({
      where: { horasaida },
    });

    if (horasaidaExists) {
      throw new Error("Hora de saída já existe.");
    }

    const request = {
      horasaida,
    };

    const { id } = await Horasaida.create(request);

    return id;
  }
})();
