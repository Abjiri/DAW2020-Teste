var express = require('express');
var router = express.Router();

var axios = require('axios');

router.get('/', function(req, res) {
  if (!req.cookies.token) {
    axios.post('http://clav-api.di.uminho.pt/v2/users/login', {username: "daw2020@teste.uminho.pt", password: "232"})
      .then(dados => {
        res.cookie('token', dados.data.token, {
          expires: new Date(Date.now() + '1d'),
          secure: false, // set to true if your using https
          httpOnly: true
        });
        res.render('index');
      })
      .catch(error => res.render('error', {error}))
  }
  else res.render('index');
});

router.get('/classes', function(req, res) {
  if (!req.cookies.token) res.redirect('/')
  else {
    axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + req.cookies.token)
      .then(dados => {
        var lista = [];

        dados.data.forEach(c => {
          lista.push({codigo: c.codigo, titulo: c.titulo});
        })

        res.render('classes', {lista});
      })
      .catch(error => res.render('error', {error}))
  }
})

router.get('/classes/c:id', function(req, res) {
  if (!req.cookies.token) res.redirect('/')
  else {
    axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id +'?token=' + req.cookies.token)
      .then(dados => {
        if (dados.data.nivel == 3) {
          axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + dados.data.codigo + '?token=' + req.cookies.token)
            .then(dados2 => res.render('classe', {c: dados.data, termosInd: dados2.data.termosInd}))
            .catch(error => res.render('error', {error}))
        }
        else res.render('classe', {c: dados.data});
      })
      .catch(error => res.render('error', {error}))
    }
})

router.get('/termos', function(req, res) {
  if (!req.cookies.token) res.redirect('/')
  else {
    axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + req.cookies.token)
      .then(dados => {
        var lista = [];

        dados.data.forEach(c => {
          lista.push({
            termo: c.termo, 
            codigoClasse: c.codigoClasse,
            idClasse: c.idClasse, 
            tituloClasse: c.tituloClasse
          });
        })

        res.render('termos', {lista});
      })
      .catch(error => res.render('error', {error}))
    }
})

module.exports = router;
