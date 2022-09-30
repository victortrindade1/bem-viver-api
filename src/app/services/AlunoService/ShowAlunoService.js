import Aluno from "../../models/Aluno";
import Turma from "../../models/Turma";
import Periodo from "../../models/Periodo";
import Turno from "../../models/Turno";
import Horaentrada from "../../models/Horaentrada";
import Horasaida from "../../models/Horasaida";

export default new (class ShowAlunoService {
  async run({ id }) {
    const aluno = await Aluno.findByPk(id, {
      include: [
        {
          model: Turma,
          as: "dados_escolares_turma",
          include: [
            {
              model: Turno,
              as: "dados_escolares_turno",
            },
          ],
        },
        {
          model: Periodo,
          as: "dados_escolares_periodo",
        },
        // {
        //   model: Turno,
        //   as: "dados_escolares_turno",
        // },
        {
          model: Horaentrada,
          as: "dados_escolares_horaentrada",
        },
        {
          model: Horasaida,
          as: "dados_escolares_horasaida",
        },
      ],
    });

    if (!aluno) {
      throw new Error("Aluno não existe.");
    }

    return aluno;
  }
})();
