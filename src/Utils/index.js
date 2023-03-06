import { Op, where, cast, col } from "sequelize";

// Yup regex
export const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
export const cepFormat = /^\d{5}-\d{3}$/;

// Verifica se a string é número. Retorna boolean
export function isNumeric(str) {
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !Number.isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

/**
 * Baseado no filter, retorna o where do que achar.
 * Para implementar, veja como ficou em AlunoController.index
 */
export const whereFilter = async ({ filter, queryFields }) => {
  const query = {};
  let countFiltered = 0;
  let queryId = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const queryField of queryFields) {
    query.where = where(
      cast(col(queryField.field), "VARCHAR"),
      process.env.NODE_ENV === "test" // Somente PG suporta iLike
        ? { [Op.like]: `%${filter}%` }
        : { [Op.iLike]: `%${filter}%` }
    );

    if (queryField.at) {
      if (queryField.at.at) {
        if (queryField.at.at.at) {
          // eslint-disable-next-line no-await-in-loop
          countFiltered = await queryField.at.at.at.model.count({
            include: [
              {
                required: true,
                model: queryField.at.at.model,
                as: queryField.at.at.as,
                through: queryField.through && { attributes: [] },
                include: [
                  {
                    required: true,
                    model: queryField.at.model,
                    as: queryField.at.as,
                    through: queryField.through && { attributes: [] },
                    include: [
                      {
                        required: true,
                        model: queryField.model,
                        as: queryField.as,
                        through: queryField.through && { attributes: [] },
                        where: query.where,
                      },
                    ],
                  },
                ],
              },
            ],
          });

          if (countFiltered > 0) {
            queryId = queryField.queryId;
            break;
          }
        }

        // eslint-disable-next-line no-await-in-loop
        countFiltered = await queryField.at.at.model.count({
          include: [
            {
              required: true,
              model: queryField.at.model,
              as: queryField.at.as,
              through: queryField.through && { attributes: [] },
              include: [
                {
                  required: true,
                  model: queryField.model,
                  as: queryField.as,
                  through: queryField.through && { attributes: [] },
                  where: query.where,
                },
              ],
            },
          ],
        });

        if (countFiltered > 0) {
          queryId = queryField.queryId;
          break;
        }
      }

      // eslint-disable-next-line no-await-in-loop
      countFiltered = await queryField.at.model.count({
        include: [
          {
            required: true,
            model: queryField.model,
            as: queryField.as,
            through: queryField.through && { attributes: [] },
            where: query.where,
          },
        ],
      });

      if (countFiltered > 0) {
        queryId = queryField.queryId;
        break;
      }
    }

    // eslint-disable-next-line no-await-in-loop
    countFiltered = await queryField.model.count({ where: query.where });

    if (countFiltered > 0) {
      queryId = queryField.queryId;
      break;
    }
  }

  query.total = countFiltered;
  query.queryId = queryId;

  if (queryId === 0) {
    query.where = {
      id: 0, // Para retornar array vazio caso não encontre
    };
  }
  return query;
};
