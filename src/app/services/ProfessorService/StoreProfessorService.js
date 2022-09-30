import Professor from "../../models/Professor";

export default new (class StoreProfessorService {
  async run({
    turmas,
    professor_nome,
    professor_cpf,
    professor_rg,
    professor_data_nascimento,
    profissional_registro_cfep,
    profissional_formacao_acad_1,
    profissional_instituicao_1,
    profissional_grau_formacao_1,
    profissional_formacao_acad_2,
    profissional_instituicao_2,
    profissional_grau_formacao_2,
    profissional_num_carteira_trabalho,
    profissional_serie_carteira_trabalho,
    profissional_nis_pis,
    end_logradouro,
    end_num,
    end_complemento,
    end_bairro,
    end_cep,
    end_cidade,
  }) {
    const request = {
      turmas,
      professor_nome,
      professor_cpf,
      professor_rg,
      professor_data_nascimento,
      profissional_registro_cfep,
      profissional_formacao_acad_1,
      profissional_instituicao_1,
      profissional_grau_formacao_1,
      profissional_formacao_acad_2,
      profissional_instituicao_2,
      profissional_grau_formacao_2,
      profissional_num_carteira_trabalho,
      profissional_serie_carteira_trabalho,
      profissional_nis_pis,
      end_logradouro,
      end_num,
      end_complemento,
      end_bairro,
      end_cep,
      end_cidade,
    };

    const professorExists = await Professor.findOne({
      where: { professor_cpf },
      //   [Op.or]: [{ professor_nome }, { professor_cpf }],
      // },
    });

    if (professorExists) {
      throw new Error("Professor já existe.");
    }

    const newProfessor = await Professor.create(request);

    // Relação Many-to-Many: Professores e Turmas
    if (turmas && turmas.length > 0) {
      newProfessor.setTurmas(turmas);
    }

    return newProfessor;
  }
})();
