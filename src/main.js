alert('Calculadora de promedios\n\nEn esta calculadora podrás cargar las notas de dos alumnos en las materias (Geografía, Matematica y Fisica). Cada materia tiene una nota de 0 a 10.\nCada materia tiene 4 cuatrimestres los cuales se promediaran.\nSi el alumno obtiene un promedio final mayor de 6, aprueba la materia, en caso contrario la desaprobara\n\nAl final, el sistema retornara, por cada alumno, el promedio de cada materia y si esta fue aprobada o no\nTambien se retornara la cantidad de alumnos que hayan aprobado dicha materia\n\nEjemplo:\n Laura\n  Geografía: Aprobada (Promedio de 8.5)\n  Matemática: Desaprobada (Promedio de 2.75)')

function Alumno (name, mathAverage, geographyAverage, physicsAverage) {
  this.name = name
  this.math = mathAverage
  this.geography = geographyAverage
  this.physics = physicsAverage

  /**
   * @param {'math'|'geography'|'physics'} subject
   */
  this.isApproved = function (subject) {
    const average = this[subject]

    if (average >= 6) {
      return 'Aprobado'
    } else {
      return 'Recursa'
    }
  }
}

function loadNotes (student, subject) {
  let noteSumRestult = 0

  for (let i = 0; i < 4; i++) {
    let note = parseInt(prompt(`${student}\nIngrese la nota para ${subject} en el cuatrimestre ${i + 1}`))
    while (isNaN(note) || note < 0 || note > 10) {
      note = parseInt(prompt(`${student}\nIngrese una nota valida para ${subject} en el cuatrimestre ${i + 1}`))
    }

    noteSumRestult += note
  }

  return noteSumRestult / 4
}

const juan = new Alumno('Juan')
juan.math = loadNotes(juan.name, 'Matemática')
juan.geography = loadNotes(juan.name, 'Geografía')
juan.physics = loadNotes(juan.name, 'Física')
console.dir({
  nombre: juan.name,
  matematica: {
    promedio: juan.math,
    aprobado: juan.isApproved('math')
  },
  geografia: {
    promedio: juan.geography,
    aprobado: juan.isApproved('geography')
  },
  fisica: {
    promedio: juan.physics,
    aprobado: juan.isApproved('physics')
  }
})

const valentin = new Alumno('Valentin')
valentin.math = loadNotes(valentin.name, 'Matemática')
valentin.geography = loadNotes(valentin.name, 'Geografía')
valentin.physics = loadNotes(valentin.name, 'Física')
console.dir({
  nombre: valentin.name,
  matematica: {
    promedio: valentin.math,
    aprobado: valentin.isApproved('math')
  },
  geografia: {
    promedio: valentin.geography,
    aprobado: valentin.isApproved('geography')
  },
  fisica: {
    promedio: valentin.physics,
    aprobado: valentin.isApproved('physics')
  }
})

alert(`
Alumnos:
  ${juan.name}:
    Matemática: ${juan.math} (${juan.isApproved('math')})
    Geografía: ${juan.geography} (${juan.isApproved('geography')})
    Física: ${juan.physics} (${juan.isApproved('physics')})
  ${valentin.name}:
    Matemática: ${valentin.math} (${valentin.isApproved('math')})
    Geografía: ${valentin.geography} (${valentin.isApproved('geography')})
    Física: ${valentin.physics} (${valentin.isApproved('physics')})
`)
