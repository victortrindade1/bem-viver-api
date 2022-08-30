import { Op, where, cast, col } from "sequelize";

// Verifica se a string é número. Retorna boolean
export function isNumeric(str) {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !Number.isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

/**
 * Cria WHERE com mais de uma possibilidade de filtro pra query de consulta
 * Argumentos:
 *  filter: string,
 *  queryFields: array_de_strings[colunas_do_banco],
 *  Model: Model da consulta
 */
export const verifyTypeFilter = async ({ filter, queryFields, Model }) => {
  let query = {};
  let countFiltered = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const field of queryFields) {
    query = {
      where: where(cast(col(field), "VARCHAR"), {
        [Op.iLike]: `%${filter}%`,
      }),
    };

    // eslint-disable-next-line no-await-in-loop
    countFiltered = await Model.count(query);

    if (countFiltered > 0) {
      break;
    }
  }
  return query;
};
