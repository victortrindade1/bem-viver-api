import Horaentrada from "../../models/Horaentrada";

export default new (class DeleteHoraentradaService {
  async run({ id }) {
    const horaentrada = await Horaentrada.findByPk(id);

    if (!horaentrada) {
      throw new Error("Hora de Saída não existe.");
    }

    await Horaentrada.destroy({ where: { id } });
  }
})();
