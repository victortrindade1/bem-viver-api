import { Op } from "sequelize";

import Ano from "../../models/Ano";

export default new (class UpdateAnoService {
  async run({ ano, sistema_id, id }) {
    const request = {
      ano,
      sistema_id,
    };

    const anoExists = await Ano.findByPk(id);

    const findAnother = await Ano.findOne({
      where: {
        [Op.and]: [
          {
            [Op.not]: [{ id: anoExists.id }],
          },
          { ano, sistema_id: sistema_id || null },
        ],
      },
    });

    if (findAnother) {
      throw new Error("Ano já existe.");
    }

    const anoUpdated = await anoExists.update(request);

    return anoUpdated;
  }
})();
