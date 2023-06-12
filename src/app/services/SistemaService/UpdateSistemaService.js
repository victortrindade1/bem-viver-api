import Sistema from "../../models/Sistema";

export default new (class UpdateSistemaService {
  async run({ id, sistema }) {
    const request = {
      id,
      sistema,
    };

    const sistemaFound = await Sistema.findByPk(id);

    // Verifica se existe outro com este nome
    const verifyExists = await Sistema.findOne({
      where: {
        sistema: sistema || sistemaFound.sistema,
      },
    });

    if (verifyExists) {
      throw new Error("Sistema já existe.");
    }

    const sistemaUpdated = await sistemaFound.update(request);

    return sistemaUpdated;
  }
})();
