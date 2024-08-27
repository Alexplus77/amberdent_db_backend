const Patients_listSchema = require("../Models/patients_list");
exports.findAndDeleteData= async (req, res)=>{
    try {
        req.body.length && req.body.forEach((el, i)=>{
          Patients_listSchema.findOneAndDelete({_id:el._id}).then(async ()=>{
                if(i===req.body.length-1){
                    const data= await Patients_listSchema.find().limit(20)
                    res.send(data)                }
            }).catch((e)=>console.log('Ошибка delete'))
        })
    }catch (e) {
        res.status(400).send({message:'Ошибка findAndDeleteData'})
    }
}