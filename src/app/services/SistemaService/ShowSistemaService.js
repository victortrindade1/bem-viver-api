import Sistema from "../../models/Sistema";

export default new (class ShowSistemaService {
  async run({ id }) {
    const sistema = await Sistema.findByPk(id, {});

    if (!sistema) {
      throw new Error("Sistema não existe.");
    }

    return sistema;
  }
})();
