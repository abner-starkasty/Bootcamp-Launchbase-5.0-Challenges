const fs   = require('fs')
const data = require('./data.json')
const Intl = require('intl')
const {age, graduation, date} = require('./useful')

//Create
exports.post = (req, res) => {
    //Validation process
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    //Data treatment
    let { avatar_url, name, birth, degree, type_class, expertise} = req.body

    birth = Date.parse(birth)
    const create_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        type_class,
        expertise,
        create_at
    })

    //Recording data process
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error in writing datas.')
        
        return res.redirect(`/teachers/${id}`)
    })
}

//Show
exports.show = (req, res) => {
    //Take the teacher
    const {id} = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    //Data treatment
    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        degree: graduation(foundTeacher.degree),
        expertise: foundTeacher.expertise.split(","),
        create_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.create_at),
    }

    return res.render('teachers/show', { teacher })
}

//Edit
exports.edit = (req, res) => {
    //Take the teacher
    const {id} = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    //Data treatment
    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
    }

    return res.render('teachers/edit', { teacher })
}