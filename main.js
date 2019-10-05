
// Unhiding element
function show(elem){
    elem.classList.remove("hide");
}

// Hiding element
function hide(elem){
    elem.classList.add("hide");
}


// Setting background color of given element
function setColor(elem, color){
    elem.classList.forEach(cls => {
        if(cls.startsWith("color-")){
            elem.classList.remove(cls);
        }
    });
    elem.classList.add("color-"+color);
}

// Shorthand wrapper for querySelector
function $(query){
    return document.querySelector(query);
}

let data = [];
let form = $("#search");
let input = $("#search>input");
let message = $(".message");

// Search the user input for banned words
function search(event){
    var value = input.value;

    // Resetting color when no input given
    if(value.length == 0){
        setColor(document.body, "primary");
        message.innerHTML = "";
        hide(message);
        return;
    }

    // Case insensitive matching
    value = value.toLowerCase();

    // Appending whitespaces to front and end for regex
    if(value[0] != " ") value = " " + value;
    if(value[-1] != " ") value = value + " ";

    var invalid = [];

    // Checking every single banned phrase's presence in user input
    data.forEach(phrase=>{
        var re = new RegExp("(?:[^a-zA-Z\d:]"+phrase+" )");

        if(value.match(re)){
            invalid.push(phrase);
        }
    });

    // If no bad words found
    if(invalid.length == 0){
        setColor(document.body, "monetized");
        message.innerHTML = "This should be monetizable!";
        show(message);
    }else{
    // If bad words found
        setColor(document.body, "demonetized");
        message.innerHTML = "You included demonetized words: <br> " + invalid.join(", ") + "";
        show(message);
    }
}

// Checking as user types
form.addEventListener("keyup", search);

// Getting banned words
fetch("/words.json")
.then(data=>{return data.json()})
.then(res=>{data = res})