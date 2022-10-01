import Sistema from "../../models/Sistema";

export default new (class DeleteSistemaService {
  async run({ id }) {
    const sistema = await Sistema.findByPk(id);

    if (!sistema) {
      throw new Error("Sistema não existe.");
    }

    await Sistema.destroy({ where: { id } });
  }
})();
