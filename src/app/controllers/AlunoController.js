import StoreAlunoService from "../services/AlunoService/StoreAlunoService";
import UpdateAlunoService from "../services/AlunoService/UpdateAlunoService";
import IndexAlunoService from "../services/AlunoService/IndexAlunoService";
import DeleteAlunoService from "../services/AlunoService/DeleteAlunoService";
import ShowAlunoService from "../services/AlunoService/ShowAlunoService";

class AlunoController {
  async store(req, res) {
    try {
      const {
        matricula,
        nome,
        dados_escolares_data_matricula,
        dados_escolares_data_pre_matricula,
        dados_pessoais_data_nascimento,
      } = req.body;

      const aluno = await StoreAlunoService.run({
        matricula,
        nome,
        dados_escolares_data_matricula,
        dados_escolares_data_pre_matricula,
        dados_pessoais_data_nascimento,
      });

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async update(req, res) {
    try {
      const requestData = req.body;

      const { id } = req.params;

      const alunoUpdated = await UpdateAlunoService.run({ id, requestData });

      return res.json(alunoUpdated);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const { page = 1, q: filter, limit = 5 } = req.query;

      const { total, alunos } = await IndexAlunoService.run({
        filter,
        limit,
        page,
      });

      return res.json({
        limit,
        page: Number(page),
        items: alunos,
        total,
        pages: Math.ceil(total / limit),
      });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const aluno = await ShowAlunoService.run({ id });

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await DeleteAlunoService.run({ id });

      return res.status(200).json({ message: "Aluno excluído com sucesso." });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new AlunoController();
