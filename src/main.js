alert('Calculadora de promedios\n\nEn esta calculadora podrás cargar las notas de dos alumnos en las materias (Geografía, Matematica y Fisica). Cada materia tiene una nota de 0 a 10.\nCada materia tiene 4 cuatrimestres los cuales se promediaran.\nSi el alumno obtiene un promedio final mayor de 6, aprueba la materia, en caso contrario la desaprobara\n\nAl final, el sistema retornara, por cada alumno, el promedio de cada materia y si esta fue aprobada o no\nTambien se retornara la cantidad de alumnos que hayan aprobado dicha materia\n\nEjemplo:\n Laura\n  Geografía: Aprobada (Promedio de 8.5)\n  Matemática: Desaprobada (Promedio de 2.75)')

function Student (name) {
  // Variables con valor inicial variable
  this.name = name

  // Variables con valor inicial predefinido
  this.math = []
  this.physics = []
  this.geography = []

  /** Obtiene la calificación promedio y condicion de aprobación de una materia dada
   * @param {number[]} subject
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

function printCalificationsOnTable (tableID, studentCalifications) {
  const table = document.getElementById(tableID)
}

const juan = createStudentWithCalifications('Juan')
const juanCalifications = juan.getAverageCalification()

const valentin = createStudentWithCalifications('Valentin')
const valentinCalifications = valentin.getAverageCalification()

printCalificationsOnTable('resultadosJuan', juanCalifications)

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
