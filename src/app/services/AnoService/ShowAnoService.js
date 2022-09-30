import Ano from "../../models/Ano";

export default new (class ShowAnoService {
  async run({ id }) {
    const ano = await Ano.findByPk(id, {});

    if (!ano) {
      throw new Error("Ano não existe.");
    }

    return ano;
  }
})();
