import { format } from "date-fns";

import Aluno from "../models/Aluno";

class MatriculaController {
  // Serve para retornar qual próximo id pra gerar matrícula
  async show(req, res) {
    try {
      const { id } = await Aluno.findOne({
        order: [["id", "DESC"]],
      });

      // Matrícula = ano atual + id
      const year = format(new Date(), "yyyy");
      const matricula = `${year}${Number(id) + 1}`;

      // Verifica se matrícula já existe. Se sim, retorna vazio pro usuário
      // preencher manualmente
      const matriculaExists = await Aluno.findOne({
        where: {
          matricula,
        },
      });

      const response = matriculaExists ? "" : matricula;

      return res.json(response);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new MatriculaController();
