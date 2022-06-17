const debugMode = false
if (debugMode) alert('ATENCIÓN: El modo de depuración está activado.\nLas calificaciones se cargaran automáticamente de manera aleatoria.')

alert('Calculadora de promedios\n\nEn esta calculadora podrás cargar las notas de dos alumnos en las materias (Geografía, Matematica y Fisica). Cada materia tiene una nota de 0 a 10.\nCada materia tiene 4 cuatrimestres los cuales se promediaran.\nSi el alumno obtiene un promedio final mayor de 6, aprueba la materia, en caso contrario la desaprobara\n\nAl final, el sistema retornara, por cada alumno, el promedio de cada materia y si esta fue aprobada o no\nTambien se retornara la cantidad de alumnos que hayan aprobado dicha materia\n\nEjemplo:\n Laura\n  Geografía: Aprobada (Promedio de 8.5)\n  Matemática: Desaprobada (Promedio de 2.75)')

const diccionarioDeMaterias = {
  math: 'Matemática',
  geography: 'Geografía',
  physics: 'Física'
}

function Student (name) {
  // Variables con valor inicial variable
  this.name = name

  // Variables con valor inicial predefinido
  this.math = []
  this.physics = []
  this.geography = []

  /** Retorna todas las calificaciones en una lista */
  this.getCalifications = function () {
    return [
      { subject: 'math', califications: this.math },
      { subject: 'geography', califications: this.geography },
      { subject: 'physics', califications: this.physics }
    ]
  }

  /** Obtiene la calificación promedio y condicion de aprobación de una materia dada
   * @param {number[]} subject Array de notas de una materia
   */
  this.getAverage = function (subject) {
    let average = 0
    for (let i = 0; i < subject.length; i++) {
      // Obtiene la suma de todas las notas
      average += subject[i]
    }

    // Obtiene el promedio de la suma de todas las notas
    average /= subject.length

    // En caso de que el promedio sea mayor a 6, el alumno aprobó la materia
    const approved = (average >= 6)

    return { average, approved }
  }

  /** Obtiene el promedio y la condicion de aprobacion para todas las materias
   * @param {'math'|'geography'|'physics'} subject
   * @param {number} note
   */
  this.getAverageCalification = function () {
    const mathAverage = this.getAverage(this.math)
    const geographyAverage = this.getAverage(this.geography)
    const physicsAverage = this.getAverage(this.physics)

    return {
      math: mathAverage,
      geography: geographyAverage,
      physics: physicsAverage
    }
  }
}

function loadCalifications (subject, name) {
  const califications = []
  for (let i = 0; i < 4; i++) {
    // Carga de calificaciones de prueba mediante metodo Math, para que no se tengan que cargar manualmente en desarrollo
    if (debugMode) {
      const randomCalification = Math.floor(Math.random() * 10) + 1
      console.log(`Califiación de ${name} en ${subject} en cuatrimestre ${i + 1}: ${randomCalification}`)
      califications.push(randomCalification)
      continue // Termina la iteración actual y continua con la siguiente
    }

    let calification = parseInt(prompt(`${name}\nIngrese la nota para ${subject} en el cuatrimestre ${i + 1}`))
    while (isNaN(calification) || calification < 0 || calification > 10) {
      calification = parseInt(prompt(`${name}\nIngrese una nota valida para ${subject} en el cuatrimestre ${i + 1}`))
    }

    califications.push(calification)
  }

  return califications
}

function createStudentWithCalifications (name) {
  const student = new Student(name)
  student.math = loadCalifications('Matemática', name)
  student.geography = loadCalifications('Geografía', name)
  student.physics = loadCalifications('Física', name)

  return student
}

/** Imprime en la tabla deseada la información del alumno
 * @param {string} tableID
 * @param {Student} student
 */
function printCalificationsOnTable (tableID, student) {
  const table = document.getElementById(tableID)

  // Obtiene las calificaciones de cada materia
  const subjects = student.getCalifications()

  const subjectsRows = subjects.map(subject => {
    const { approved, average } = student.getAverage(subject.califications)
    const subjectNaturalName = diccionarioDeMaterias[subject.subject]

    const tableRow = document.createElement('tr')
    tableRow.innerHTML = `
      <td>${subjectNaturalName}</td>
      ${subject.califications.map(calification => `<td>${calification}</td>`).join('')}
      <td>${approved ? 'Aprobado' : 'Desaprobado'}</td>
      <td>${average}</td>
    `

    return tableRow
  })

  table.innerHTML = subjectsRows.map(row => row.outerHTML).join('')
}

const juan = createStudentWithCalifications('Juan')

// const valentin = createStudentWithCalifications('Valentin')
// const valentinCalifications = valentin.getAverageCalification()

printCalificationsOnTable('resultadosJuan', juan)

// alert(`
// Alumnos:
//   ${juan.name}:
//     Matemática: ${juanCalifications.math.average} (${juanCalifications.math.approved})
//     Geografía: ${juanCalifications.geography.average} (${juanCalifications.geography.approved})
//     Física: ${juanCalifications.physics.average} (${juanCalifications.physics.approved})
//   ${valentin.name}:
//     Matemática: ${valentinCalifications.math.average} (${valentinCalifications.math.approved})
//     Geografía: ${valentinCalifications.geography.average} (${valentinCalifications.geography.approved})
//     Física: ${valentinCalifications.physics.average} (${valentinCalifications.physics.approved})
// `)
