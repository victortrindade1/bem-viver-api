import Ano from "../../models/Ano";

export default new (class StoreAnoService {
  async run({ ano, sistema_id }) {
    const request = { ano, sistema_id };

    const anoExists = await Ano.findOne({
      where: sistema_id ? { ano, sistema_id } : { ano },
    });

    if (anoExists) {
      throw new Error("Ano já existe.");
    }

    const { id } = await Ano.create(request);

    return id;
  }
})();
