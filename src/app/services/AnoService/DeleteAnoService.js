import Ano from "../../models/Ano";

export default new (class DeleteAnoService {
  async run({ id }) {
    const ano = await Ano.findByPk(id);

    if (!ano) {
      throw new Error("Ano não existe.");
    }

    await Ano.destroy({ where: { id } });
  }
})();
