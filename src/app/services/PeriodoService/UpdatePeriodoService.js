import Periodo from "../../models/Periodo";

export default new (class UpdatePeriodoService {
  async run({ id, periodo }) {
    const request = {
      id,
      periodo,
    };

    const periodoFound = await Periodo.findByPk(id);

    // Verifica se existe outro com este nome
    const verifyExists = await Periodo.findOne({
      where: {
        periodo: periodo || periodoFound.periodo,
      },
    });

    if (verifyExists) {
      throw new Error("Período já existe.");
    }

    const periodoUpdated = await periodoFound.update(request);

    return periodoUpdated;
  }
})();
