import * as Yup from "yup";

export const validateTurmaStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      turma: Yup.string().required(),
      ano_id: Yup.number(),
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
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
