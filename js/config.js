function load_config(e){
    console.log(e)
    file = e.target.files[0];
    window.localStorage.removeItem('actualCourse');
    window.localStorage.removeItem('leidos');
    console.log(file)
    console.log(window.localStorage.getItem('Paco'))
    fileReader = new FileReader()
    fileReader.onload = function(){
        let parseJSON = JSON.parse(fileReader.result)
        window.localStorage['rawData'] = fileReader.result
        window.location = '/'
    }
    fileReader.readAsText(file)

}


document.addEventListener("DOMContentLoaded", function(event) {
    $config = document.getElementById('config')
    $config.addEventListener('input', load_config)
});