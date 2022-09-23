import * as Yup from "yup";

export const validateAnoStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      ano: Yup.string().required(),
      sistema_id: Yup.number(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};

export const validateAnoUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      ano: Yup.string(),
      sistema_id: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validation fails", messages: err.inner });
  }
};
