function show(elem){
    elem.classList.remove("hide");
}

function hide(elem){
    elem.classList.add("hide");
}

function displayResults(results){

}

function setColor(elem, color){
    elem.classList.forEach(cls => {
        if(cls.startsWith("color-")){
            elem.classList.remove(cls);
        }
    });
    elem.classList.add("color-"+color);
}

function $(query){
    return document.querySelector(query);
}

let data = [];
let form = $("#search");
let input = $("#search>input");
let message = $(".message");

function search(event){
    var value = input.value;

    if(value.length == 0){
        setColor(document.body, "primary");
        message.innerHTML = "";
        hide(message);
        return;
    }

    var words = value.split(" ");

    var invalid = [];

    words.forEach(word=>{
        if(data.includes(word.toLowerCase()) && !invalid.includes(word)){
            invalid.push(word);
        }
    });

    if(invalid.length == 0){
        setColor(document.body, "monetized");
        message.innerHTML = "This should be monetizable!";
        show(message);
    }else{
        setColor(document.body, "demonetized");
        message.innerHTML = "You included demonetized words: <br> " + invalid.join(", ") + "";
        show(message);
    }
}

form.addEventListener("keyup", search);


fetch("/words.json")
.then(data=>{return data.json()})
.then(res=>{data = res})