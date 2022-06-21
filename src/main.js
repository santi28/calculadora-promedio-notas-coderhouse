// const debugMode = false
// if (debugMode) alert('ATENCIÓN: El modo de depuración está activado.\nLas calificaciones se cargaran automáticamente de manera aleatoria.')

// alert('Calculadora de promedios\n\nEn esta calculadora podrás cargar las notas de dos alumnos en las materias (Geografía, Matematica y Fisica). Cada materia tiene una nota de 0 a 10.\nCada materia tiene 4 cuatrimestres los cuales se promediaran.\nSi el alumno obtiene un promedio final mayor de 6, aprueba la materia, en caso contrario la desaprobara\n\nAl final, el sistema retornara, por cada alumno, el promedio de cada materia y si esta fue aprobada o no\nTambien se retornara la cantidad de alumnos que hayan aprobado dicha materia\n\nEjemplo:\n Laura\n  Geografía: Aprobada (Promedio de 8.5)\n  Matemática: Desaprobada (Promedio de 2.75)')

const diccionarioDeMaterias = {
  math: 'Matemática',
  geography: 'Geografía',
  physics: 'Física'
}

function Student (name, math, physics, geography) {
  // Variables con valor inicial variable
  this.name = name

  // Variables con valor inicial predefinido
  this.math = math
  this.physics = physics
  this.geography = geography

  /** Retorna todas las calificaciones en una lista */
  this.getCalifications = function () {
    return [
      { subject: diccionarioDeMaterias.math, califications: this.math, average: this.getAverage(this.math) },
      { subject: diccionarioDeMaterias.geography, califications: this.geography, average: this.getAverage(this.geography) },
      { subject: diccionarioDeMaterias.physics, califications: this.physics, average: this.getAverage(this.physics) }
    ]
  }

  /** Obtiene la calificación promedio y condicion de aprobación de una materia dada
   * @param {number[]} subject Array de notas de una materia
   */
  this.getAverage = function (subject) {
    let average = 0

    for (let i = 0; i < subject.length; i++) {
      // Obtiene la suma de todas las notas
      average += parseInt(subject[i])
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

/** Imprime en la tabla deseada la información del alumno */
function createTableRows (subjects) {
  return subjects.map(subject => {
    const tableRow = document.createElement('tr')
    tableRow.className = 'bg-white border-b'

    tableRow.innerHTML = `
      <td class="px-6 py-4 font-medium text-gray-900">${subject.subject}</td>
      ${subject.califications.map(calification => `<td class="px-6 py-4">${calification}</td>`).join('')}
      <td class="px-6 py-4">${subject.average.approved ? 'Aprobado' : 'Desaprobado'}</td>
      <td class="px-6 py-4">${subject.average.average}</td>
    `

    return tableRow
  })
}

/** Retorna la tabla con las calificaciónes del alumno
 * @param {Student} student
 */
function creataCalificationsTable (student) {
  const calificationsTable = document.createElement('table')
  calificationsTable.className = 'w-full text-sm text-left text-gray-500'

  const calificationsTableHeader = document.createElement('thead')
  calificationsTableHeader.className = 'text-xs text-gray-700 uppercase bg-gray-50'
  calificationsTableHeader.innerHTML = '<tr> <th class="px-6 py-3">Materia</th> <th class="px-6 py-3">1° Cuatrimestre</th> <th class="px-6 py-3">2° Cuatrimestre</th> <th class="px-6 py-3">3° Cuatrimestre</th> <th class="px-6 py-3">4° Cuatrimestre</th> <th class="px-6 py-3">Condición</th> <th class="px-6 py-3">Promedio</th> </tr>'
  calificationsTable.appendChild(calificationsTableHeader)

  const califications = student.getCalifications()
  const calificationsRows = createTableRows(califications)

  const calificationsTableBody = document.createElement('tbody')
  calificationsTableBody.append(...calificationsRows)
  calificationsTable.appendChild(calificationsTableBody)

  return calificationsTable
}

/** Crea una tarjeta de estudiante con su tabla ETC
 * @param {Student} student
 */
function createStudentCard (student) {
  const studentCardDiv = document.createElement('div')
  studentCardDiv.className = 'p-4 border-2 rounded-lg'

  const studentNameInCard = document.createElement('h3')
  studentNameInCard.className = 'pb-2 mb-2 border-b-2 text-lg italic font-bold'
  studentNameInCard.innerText = student.name
  studentCardDiv.appendChild(studentNameInCard)

  const tableWrapper = document.createElement('div')
  tableWrapper.className = 'relative overflow-x-auto shadow sm:rounded-lg'
  tableWrapper.appendChild(creataCalificationsTable(student))
  studentCardDiv.appendChild(tableWrapper)

  return studentCardDiv
}

/** Renderiza la lista de estudiantes con sus respectivos textos y tablas
 * @param {Student[]} students
 */
function renderStudents (students) {
  const studentWrapper = document.getElementById('studentsWrapper')
  studentWrapper.innerHTML = ''

  for (const student of students) {
    studentWrapper.appendChild(createStudentCard(student))
  }
}

const allRegiteredStudents = []

// #region Control del formulario
const form = document.getElementById('studentForm')
form.addEventListener('submit', (e) => {
  e.preventDefault() // Remueve el evento por defecto del form
  const formData = new FormData(e.target) // Obtiene todos los datos del form

  const studentName = formData.get('name')

  const allMathResultsInArray = formData.getAll('math')
  const allGeographyResultsInArray = formData.getAll('geo')
  const allPhysicsResultsInArray = formData.getAll('phy')

  // Crea el nuevo estudiante en base a los datos obtenidos del form
  const newStudent = new Student(studentName, allMathResultsInArray, allGeographyResultsInArray, allPhysicsResultsInArray)
  allRegiteredStudents.push(newStudent)

  // Resetea todos los campos del formulario
  form.reset()
  renderStudents(allRegiteredStudents)
})
// #endregion
