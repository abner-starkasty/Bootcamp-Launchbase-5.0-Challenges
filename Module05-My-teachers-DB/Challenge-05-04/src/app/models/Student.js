const db = require('../../config/db')
const { date } = require('../../lib/useful')

module.exports = {
  all(callback) {
    const query = `
      SELECT * 
      FROM students
      ORDER BY name ASC
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        email,
        birth,
        grade_school,
        course_load,
        teacher_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.grade_school,
      data.course_load,
      data.teacher
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    const query = `
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
      UPDATE students SET
        avatar_url=($1),
        name=($2),
        email=($3),
        birth=($4),
        grade_school=($5),
        course_load=($6),
        teacher_id=($7)
      WHERE id = $8
    `

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.grade_school,
      data.course_load,
      data.teacher,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    const query = `DELETE FROM students WHERE id = $1`

    db.query(query, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  teacherSelectOptions(callback) {
    const query = `
      SELECT id, name 
      FROM teachers
      ORDER BY name ASC
    `

    db.query(query, (err, results) => {
      if (err) throw `Database Error! ${err}`
      
      callback(results.rows)
    })
  }
}