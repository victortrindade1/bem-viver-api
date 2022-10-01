import Sistema from "../../models/Sistema";

export default new (class StoreSistemaService {
  async run({ sistema }) {
    const sistemaExists = await Sistema.findOne({
      where: { sistema },
    });

    if (sistemaExists) {
      throw new Error("Sistema já existe.");
    }

    const request = {
      sistema,
    };

    const { id } = await Sistema.create(request);

    return id;
  }
})();
