import Periodo from "../../models/Periodo";

export default new (class StorePeriodoService {
  async run({ periodo }) {
    const periodoExists = await Periodo.findOne({
      where: { periodo },
    });

    if (periodoExists) {
      throw new Error("Período já existe.");
    }

    const request = {
      periodo,
    };

    const { id } = await Periodo.create(request);

    return id;
  }
})();
