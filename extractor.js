const fs = require('fs');

const additional_path = `${__dirname}/`
const data_path = `${additional_path}data.txt`
const numbers_path = `${additional_path}numbers.txt`

const seasons = ['winter','spring','summer','autumn']
const current_season = seasons[3]
const year = 2026

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
            console.log("Invalid string found! ", data[i])
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
            console.log("Invalid number found! ", numbers[i])
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
	var name_in_csv = `Anime ${current_season} ${year}`
	var file_name = `${additional_path}anime-${current_season}-${year}.csv`
	console.log({name_in_csv, file_name})
    write_result(name_in_csv, tmp_array, file_name)
	var dir_name = `${additional_path}anime-${current_season}-${year}`
	console.log({dir_name})
	if (!fs.existsSync(dir_name)) fs.mkdirSync(dir_name)
	console.log("Everything done!")
})()