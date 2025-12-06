function load_course(course){
    let $totales = document.getElementById('totales');
    let $porLeer = document.getElementById('por_leer');
    let $students = document.getElementById('students');
    window.leidos = JSON.parse(window.localStorage.getItem('leidos')) || [];
    window.invitations = {}
    window.rawData.invitations[course].forEach(element =>{
        console.log(element)
        window.invitations[element.code] = {studen: element.student_name, invitation: element.invitation_name, readed: element.code in window.leidos};
        let alumno = document.createElement('li')
        alumno.innerHTML = `${element.invitation_name} (${element.student_name})`
        alumno.id = element.code
        if (element.code in window.leidos) alumno.classList.add('tachado');
        $students.appendChild(alumno)
    })
    $totales.innerText = window.rawData.invitations[course].length;
    $porLeer.innerText = window.leidos.length;
}
function changeCourse(e){
    console.log(e);
    let course = e.target.value;
    window.localStorage.setItem('actualCourse', course)
    load_course(course);
}


document.addEventListener("DOMContentLoaded", function(event) {
    window.rawData = JSON.parse(window.localStorage['rawData']);
    let course = window.localStorage.getItem('actualCourse');
    console.log(rawData)
    let $select = document.getElementById('obra');

    $select.addEventListener('input', changeCourse)
    window.rawData.plays.forEach(element => {
        let option = document.createElement('option')
        option.value = element.course_id
        option.text = `${element.course} - ${element.name}`
        $select.appendChild(option)
    });
    $select.value = course;
    if (course) load_course(course)
});