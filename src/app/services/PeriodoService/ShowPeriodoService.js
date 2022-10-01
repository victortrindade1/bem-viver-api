import Periodo from "../../models/Periodo";

export default new (class ShowPeriodoService {
  async run({ id }) {
    const periodo = await Periodo.findByPk(id, {});

    if (!periodo) {
      throw new Error("Periodo não existe.");
    }

    return periodo;
  }
})();
