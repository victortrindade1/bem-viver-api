import Sequelize, { Model } from "sequelize";

class Ano extends Model {
  static init(sequelize) {
    super.init(
      {
        label: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Ano;
