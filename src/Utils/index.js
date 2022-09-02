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
 *  Model: Model da consulta,
 * modelsRef: array de models p/ os fields id de referência
 *  modelsRef: [{ Model: Model, title: string }],
 */
export const verifyTypeFilter = async ({
  filter,
  queryFields,
  Model,
  modelsRef,
}) => {
  const query = {};

  let countFiltered = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const field of queryFields) {
    // Verifica se filter é id de referência de outra table
    if (field.slice(-3) === "_id") {
      // Ex: turma_id -> turma_id - _id + s = turmas
      const modelField = `${field.slice(0, field.length - 3)}s`;

      // eslint-disable-next-line no-restricted-syntax
      for (const modelRef of modelsRef) {
        if (modelRef.title === modelField) {
          // eslint-disable-next-line no-await-in-loop
          const item = await modelRef.Model.findOne({
            where: {
              label: {
                [Op.iLike]: `%${filter}%`,
              },
            },
            attributes: ["id"],
          });

          if (item) {
            query.where = { [field]: item.id };
            return query;
          }
        }
      }
    }

    query.where = where(cast(col(field), "VARCHAR"), {
      [Op.iLike]: `%${filter}%`,
    });

    // eslint-disable-next-line no-await-in-loop
    countFiltered = await Model.count({ where: query.where });

    if (countFiltered > 0) {
      break;
    }
  }
  return query;
};
