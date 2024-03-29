import * as Yup from "yup";

export const validateTurmaStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      turma: Yup.string().required(),
      // ano_id: Yup.number().required(),
      // turno_id: Yup.number().required(),
      // professores: Yup.array().of(Yup.number()),
      // materias: Yup.array().of(Yup.number()),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateTurmaUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      turma: Yup.string(),
      ano_id: Yup.number(),
      turno_id: Yup.number(),
      // professores: Yup.array().of(Yup.number()),
      // materias: Yup.array().of(Yup.number()),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
