import Professor from "../../models/Professor";

export default new (class DeleteProfessorService {
  async run({ id }) {
    const professor = await Professor.findByPk(id);

    if (!professor) {
      throw new Error("Professor não existe.");
    }

    await Professor.destroy({ where: { id } });
  }
})();
