var express = require('express');
var router = express.Router();

const Batismo = require('../controllers/batismo')

router.get('/batismos', function(req, res) {
  if (req.query.ano) {
    Batismo.consultarPorAno(req.query.ano)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  }
  else {
    Batismo.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  }
});

router.get('/batismos/progenitores', function(req, res) {
  Batismo.consultarProgenitores()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/batismos/stats', function(req, res) {
  Batismo.consultarStats()
    .then(dados => {
      var dadosAgrupados = {};

      dados.forEach(b => {
        var split = b.date.split('-');
        if (split[0] in dadosAgrupados) {
          dadosAgrupados[split[0]]++;
        }
        else {
          dadosAgrupados[split[0]] = 1;
        }
      })

      res.status(200).jsonp(dadosAgrupados)
    })
    .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/batismos/batisado', function(req, res) {
  Batismo.consultarBatizados()
    .then(dados => {
      var batizados = [];

      dados.forEach(b => {
        var split1 = b.title.split(/n\.º [0-9]+: /);
        var split2 = split1[1].split('.');

        if (!batizados.includes(split2[0])) {
          batizados.push(split2[0]);
        }
      })

      batizados = batizados.sort(function (a, b) {
          return (a).localeCompare(b, 'pt');
      })

      res.status(200).jsonp(batizados)
    })
    .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/batismos/:id', function(req, res) {
  Batismo.consultarId(req.params.id)
    .then(dados => {res.status(200).jsonp(dados)})
    .catch(e => res.status(500).jsonp({error: e}))
})

module.exports = router;
