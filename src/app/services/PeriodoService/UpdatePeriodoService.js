import Periodo from "../../models/Periodo";

export default new (class UpdatePeriodoService {
  async run({ id, periodo }) {
    const request = {
      id,
      periodo,
    };

    const periodoExists = await Periodo.findByPk(id);

    const periodoUpdated = await periodoExists.update(request);

    return periodoUpdated;
  }
})();
