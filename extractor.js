const fs = require('fs');

const additional_path = `${__dirname}/`
const data_path = `${additional_path}data.txt`
const numbers_path = `${additional_path}numbers.txt`

function is_necessary_exist(){
    return (fs.existsSync(data_path) && fs.existsSync(numbers_path))
}

function get_data(){
    var raw = fs.readFileSync(data_path).toString()
    if (raw == "" || raw == "\n" || raw == "\r\n"){
        console.log("Empty file found!")
        return "error"
    } 
    var data = (raw.replace('\r','')).split('\n')
    var test_regex = new RegExp("[0-9]{1,2}:[0-9]{1,2} [0-9]{1,2}[\)] .*")
    var replace_regex = new RegExp("[0-9]{1,2}:[0-9]{1,2} ")
    for (var i = 0; i < data.length; i++){
        if(test_regex.test(data[i])){ 
            data[i] = data[i].replace(replace_regex,"")
        } else {
            console.log("Invalid string found!")
            return "error"
        }
    }
    return data
}
function get_numbers(){
    var raw = fs.readFileSync(numbers_path).toString()
    if (raw == "" || raw == "\n" || raw == "\r\n"){
        console.log("Empty file found!")
        return "error"
    } 
    var numbers = raw.split(' ')
    var test_regex = new RegExp("[0-9]{1,2}")
    for (var i = 0; i < numbers.length; i++){
        if(!test_regex.test(numbers[i])){
            console.log("Invalid number found!")
            return "error"
        }
    }
    return numbers
}

function write_result(title, lines, file_name){
    var tmp_string = title
    for (var line of lines){
        tmp_string += `\n${line}`
    }
    fs.writeFileSync(file_name, tmp_string)
}

(function(){
    if (!is_necessary_exist()){
        console.log("No input file(s) found!")
        return 
    } 
    var numbers = get_numbers()
    var data  = get_data()
    if (numbers == "error" || data == "error") return
    var tmp_array = [];
    for (var number of numbers){
        tmp_array.push(data[number - 1])
    }
    write_result("test name 20XXb", tmp_array, `${additional_path}test1.csv`)
})()