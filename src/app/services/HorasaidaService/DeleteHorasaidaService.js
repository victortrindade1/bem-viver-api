import Horasaida from "../../models/Horasaida";

export default new (class DeleteHorasaidaService {
  async run({ id }) {
    const horasaida = await Horasaida.findByPk(id);

    if (!horasaida) {
      throw new Error("Hora de Saída não existe.");
    }

    await Horasaida.destroy({ where: { id } });
  }
})();
