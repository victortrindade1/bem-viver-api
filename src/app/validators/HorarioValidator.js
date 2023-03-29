import * as Yup from "yup";

export const validateHorarioStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      diahora: Yup.string().required(),
      professor_id: Yup.number(),
      materia_id: Yup.number(),
      turma_id: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateHorarioUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      diahora: Yup.string(),
      professor_id: Yup.number(),
      materia_id: Yup.number(),
      turma_id: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
