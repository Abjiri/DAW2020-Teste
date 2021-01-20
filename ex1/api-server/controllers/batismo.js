var Batismo = require('../models/batismo')

module.exports.listar = () => {
    return Batismo
        .find({},{_id: 1, date: 1, title: 1, ref: 1})
        .exec()
}

module.exports.consultarId = id => {
    return Batismo
        .findOne({_id: id})
        .exec()
}

module.exports.consultarBatizados = () => {
    return Batismo
        .find({}, {title: 1, _id: 0})
        .exec()
}

module.exports.consultarProgenitores = () => {
    return Batismo
        .find({}, {_id: 1, pai: 1, mae: 1})
        .exec()
}   

module.exports.consultarPorAno = ano => {
    return Batismo
        .find({date: new RegExp(ano, "i")})
        .exec();
}

module.exports.consultarStats = () => {
    return Batismo
        .find({}, {date: 1, _id: 0})
        .exec()
}