function saveData(key,object){
    let value = JSON.stringify(object);
    localStorage.setItem(key,value);
}

function getData(key){
    let dataString = localStorage.getItem(key);
    return JSON.parse(dataString);
}

function clear(key){
    localStorage.removeItem(key);
}

function clearAll(){
    localStorage.clear();
}

export default {
    saveData,
    getData,
    clear,
    clearAll
}