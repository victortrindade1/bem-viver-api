import * as Yup from "yup";

export const validateHoraentradaStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      horaentrada: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateHoraentradaUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      horaentrada: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
