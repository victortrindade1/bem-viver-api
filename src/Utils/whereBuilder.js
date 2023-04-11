import { Op } from "sequelize";

function buildWhereClause(queryField, filterValue) {
  const { field } = queryField;
  const tableName = queryField.model.getTableName();
  const column = `${tableName}.${field}`;
  const castColumn = `CAST(${column} AS VARCHAR)`;

  if (queryField.through) {
    const throughModel = queryField.through.model;
    const throughAs = queryField.through.as;
    // const throughJoinClause = `${throughModel.getTableName()} AS ${throughAs}`;
    // const throughJoinOn = `${throughAs}.${queryField.through.foreignKey} = ${tableName}.id`;
    const throughInclude = {
      model: throughModel,
      as: throughAs,
      attributes: [],
    };
    return {
      [Op.and]: [
        {
          [Op.or]: [
            { [castColumn]: { [Op.iLike]: `%${filterValue}%` } },
            {
              [throughAs]: { [castColumn]: { [Op.iLike]: `%${filterValue}%` } },
            },
          ],
        },
        { [throughAs]: { [queryField.as]: null } },
        { "$throughModel.id$": { [Op.ne]: null } },
      ],
      include: [throughInclude],
      through: {
        model: throughModel,
        as: throughAs,
        include: [throughInclude],
        where: { "$throughModel.id$": { [Op.ne]: null } },
      },
    };
  }

  return { [castColumn]: { [Op.iLike]: `%${filterValue}%` } };
}

export default async function whereFilter({ filter, queryFields }) {
  const filterValue = filter.trim();
  const whereClauses = queryFields.map((queryField) =>
    buildWhereClause(queryField, filterValue)
  );
  console.log({ whereClauses });
  const [resultCounts, queryIds] = await Promise.all(
    queryFields.map(async (queryField) => {
      const options = { where: whereClauses.shift() };
      if (queryField.include) {
        options.include = queryField.include;
      }
      return [await queryField.model.count(options), queryField.queryId];
    })
  );

  const index = resultCounts.findIndex((count) => count > 0);
  const [total, queryId] =
    index >= 0 ? [resultCounts[index], queryIds[index]] : [0, 0];
  const where = index >= 0 ? whereClauses[index] : { id: 0 };

  return { total, queryId, where };
}
