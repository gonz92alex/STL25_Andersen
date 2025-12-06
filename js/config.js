function load_config(e){
    window.localStorage.clear();
    file = e.target.files[0];
    window.localStorage.removeItem('actualCourse');
    window.localStorage.removeItem('leidos');
    console.log(file)
    console.log(window.localStorage.getItem('Paco'))
    fileReader = new FileReader()
    fileReader.onload = function(){
        window.localStorage['rawData'] = fileReader.result
        window.location = window.location.href.replace('/config.html', '')
    }
    fileReader.readAsText(file)
    e.preventDefault();
}


document.addEventListener("DOMContentLoaded", function(event) {
    $config = document.getElementById('config')
    $config.addEventListener('input', load_config)
});