import * as Yup from "yup";

export const validateTurnoStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      turno: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateTurnoUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      turno: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
