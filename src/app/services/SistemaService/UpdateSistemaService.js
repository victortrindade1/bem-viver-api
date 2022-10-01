import Sistema from "../../models/Sistema";

export default new (class UpdateSistemaService {
  async run({ id, sistema }) {
    const request = {
      id,
      sistema,
    };

    const sistemaExists = await Sistema.findByPk(id);

    const sistemaUpdated = await sistemaExists.update(request);

    return sistemaUpdated;
  }
})();
