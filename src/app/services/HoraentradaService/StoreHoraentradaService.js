import Horaentrada from "../../models/Horaentrada";

export default new (class StoreHoraentradaService {
  async run({ horaentrada }) {
    const horaentradaExists = await Horaentrada.findOne({
      where: { horaentrada },
    });

    if (horaentradaExists) {
      throw new Error("Hora de saída já existe.");
    }

    const request = {
      horaentrada,
    };

    const { id } = await Horaentrada.create(request);

    return id;
  }
})();
