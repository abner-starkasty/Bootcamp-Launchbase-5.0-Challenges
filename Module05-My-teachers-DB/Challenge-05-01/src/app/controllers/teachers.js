const {age, graduation, date, transformExpertise} = require('../../lib/useful')

module.exports = {
  index(req, res) {
    return res.render("teachers/index")
  },
  create(req, res) {
    return res.render("teachers/create")
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    let { avatar_url, name, birth, degree, type_class, expertise} = req.body

    return
  },
  show(req, res) {
    return
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }

    return
  },
  delete(req, res) {
    return
  },
}