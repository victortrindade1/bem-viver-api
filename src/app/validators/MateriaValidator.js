import * as Yup from "yup";

export const validateMateriaStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      materia: Yup.string().required(),
      professores: Yup.array().of(Yup.number()),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateMateriaUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      materia: Yup.string(),
      professores: Yup.array().of(Yup.number()),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
