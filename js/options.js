function load_course(course){
    let $totales = document.getElementById('totales');
    let $porLeer = document.getElementById('por_leer');
    let $students = document.getElementById('students');
    $students.innerHTML = '';
    window.course = course;
    window.leidos = JSON.parse(window.localStorage.getItem(`leidos_${window.course}`)) || [];
    window.invitations = {}
    window.rawData.invitations[course].forEach(element =>{
        window.invitations[element.code] = {student: element.student_name, invitation: element.invitation_name, readed: element.code in window.leidos};
        let alumno = document.createElement('li')
        alumno.innerHTML = `${element.invitation_name} (${element.student_name})`
        alumno.id = element.code;
        if (window.leidos.includes(element.code)) alumno.classList.add('tachado');
        $students.appendChild(alumno)
    })
    $totales.innerText = window.rawData.invitations[course].length;
    $porLeer.innerText = window.leidos.length;
}
function changeCourse(e){
    let course = e.target.value;
    load_course(course);
    document.body.style.backgroundColor = 'white';
}


document.addEventListener("DOMContentLoaded", function(event) {
    window.rawData = JSON.parse(window.localStorage['rawData']);
    let course = window.localStorage.getItem('actualCourse');
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

function invitation_correct(code){
    window.ultimoLeido = code;
    window.leidos.push(window.ultimoLeido);
    window.localStorage.setItem(`leidos_${window.course}`, JSON.stringify(window.leidos));
    document.body.style.backgroundColor = 'green';
    document.getElementById(code).classList.add('tachado');
    document.getElementById('por_leer').innerText = window.leidos.length;
    window.invitations[code];
    //let utterance = new SpeechSynthesisUtterance(`Hola ${window.invitations[code].invitation} disfruta de la obra de ${window.invitations[code].student}`);
    //speechSynthesis.speak(utterance);
}


function onScanSuccess(decodedText, decodedResult) {
  window.leidos = window.leidos || [];
  window.ultimoLeido = window.ultimoLeido || '';
  if (decodedText in window.invitations){
    document.getElementById('result').innerText = `Leido: ${decodedText} - ${window.invitations[decodedText].invitation || ''} (${window.invitations[decodedText].student || ''} )`;
    if (window.leidos.includes(decodedText)){
      if (window.ultimoLeido === decodedText) return
      document.body.style.backgroundColor = 'orange';
      document.getElementById('result').innerText = `Leido anteriormente: ${decodedText} - ${window.invitations[decodedText].invitation || ''} (${window.invitations[decodedText].student || ''})`;
    }
    else{
        invitation_correct(decodedText);
    }
  }
  else{
    document.getElementById('result').innerText = `Error: ${decodedText}`;
    document.body.style.backgroundColor = 'red';
  }
}

let config = {
    fps: 10,
    qrbox: {width: 150, height: 150},
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [
        Html5QrcodeScanType.SCAN_TYPE_CAMERA, 
        //Html5QrcodeScanType.SCAN_TYPE_FILE
    ],
    showTorchButtonIfSupported: true
};

window.html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", config, verbose= false);
window.html5QrcodeScanner.render(onScanSuccess);