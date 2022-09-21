import { unlink } from "fs/promises";
import { resolve } from "path";

import File from "../models/File";

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const file = await File.findByPk(id);

      if (!file) {
        return res.status(400).json({ error: "Arquivo não existe." });
      }

      // Deleta o arquivo permanentemente do servidor
      await unlink(
        `${resolve(__dirname, "..", "..", "..", "tmp", "uploads")}/${file.path}`
      );

      // Deleta os dados do banco
      await File.destroy({ where: { id } });

      return res.status(200).json({ message: "Arquivo excluído com sucesso." });
    } catch (err) {
      return res.status(400).json({ error: "Error in database." });
    }
  }
}

export default new FileController();
