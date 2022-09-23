import * as Yup from "yup";

export const validateSistemaStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      sistema: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateSistemaUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      sistema: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
