const csv = require("fast-csv");
const fs = require("fs");
//Функция по парсингу  csv файла и записи в базу данных.
exports.csvParseFile =  (req, header, bdSchema) => {

    let arrayRows = [];//Массив спарсеных строк таблицы csv
let arrTest=[]
    csv
        .parseFile(req.file.path, {
            discardUnmappedColumns: true,
            ignoreEmpty: true,
        })
        .on("data", (data) => {
            arrayRows.push(data.join(",").split(";"));
        })
        .on("error", (err) => {
            console.log("Error from csvParsFile:", err);
        })
        .on("finish", () => {
            arrayRows.splice(0, 1); //удалили строку с заголовками
            let indexFirstRow = 0; //индекс массива таблицы с которого начинаются строки данных после заголовка
            //Функция рекурсия, формирует обьект(ключ-заголовок header:значение-данные массива строк)
            const iterator = () => {

                try {
                    const objRow = {}; //Обьект строки таблицы csv для записи в БД
                    if (arrayRows[indexFirstRow]) {
                        arrayRows[indexFirstRow].reduce((acc, el, i) => {
                          header[i] &&    acc.push(objRow[header[i]] = el.replaceAll("₽", " ").trim())
                                return  acc;
                        },[]);
                    //Проверка на одинаковую запись в базе данных и есле таковой нет, то сохраняет в базу данных

                        bdSchema.findOne(objRow).then((docs)=>{

                            if (docs){throw new Error('Такая запись есть!!!')}
                       if(!docs) {

                           console.log(objRow)
                            new bdSchema(objRow).save().then(()=>{arrayRows.splice(indexFirstRow, 1)})
                       }
                   }).catch((e)=>console.log(e))
                        indexFirstRow++;

                        iterator(); //включаем рекурсию
                    }

                } catch (e) {
                    console.log("from iterator", e);
                }

            };
            iterator();

        })
        .on("end", () => {
            fs.unlink(req.file.path, function (err) {
                if (err) return console.log(err);
            }); // удаляем загружаемый файл
        });


}