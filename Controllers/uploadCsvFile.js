const { header } = require("../HelperFiles/headerTabCsv");
const Patients_listSchema = require("../Models/patients_list");
const {csvParseFile} = require("../HelperFiles/csvParseFile");

// Контроллер парсит файл csv и записывает в базу данных
exports.postFile = function (req, res) {
  try {
    if (!req.file.filename)
      return res.status(400).send("No files were uploaded.");
   csvParseFile(req, header, Patients_listSchema) //Парсим csv файл и записываем в базу данных.

  } catch (e) {
    res.status(500).send({ message: "Ошибка в функции postFile" });
  }
};
