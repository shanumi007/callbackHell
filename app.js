let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
document.querySelector("body").style.backgroundColor = "black";
document.querySelector("h1").style.color = "#ff6600";
document.querySelector("h3").style.color = "#ff6600";
function changeNameColor(color, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            h3.style.color = color;
            resolve("color changed!");
        }, delay);
    });
}
setInterval(() => {
    changeNameColor("#ff6600", 1000)
        .then(()=> {
            console.log("Red colour was completed.");
            return changeNameColor("white", 1000);
        })
        .then(()=> {
            console.log("White colour was completed.");
            return changeNameColor("#1c1ca5", 1000);
        })
        .then(()=> {
            console.log("Blue colour was completed.");
            return changeNameColor("white", 1000);
        })
        .then(()=> {
            console.log("White colour was completed.");
            return changeNameColor("#046434", 1000);
        })
        .then(()=> {
            console.log("Green colour was completed.");
        });
    }, 6000);
function changeColor(color, delay, nextColor) {
    setTimeout(() => {
        h1.style.color = color;
        if(nextColor) nextColor();
    }, delay);
}
setInterval(() => {
    changeColor("#ff6600", 1000, ()=> {
        changeColor("white", 1000, ()=> {
            changeColor("#1c1ca5", 1000, ()=> {
                changeColor("white", 1000, ()=> {
                    changeColor("#046434", 1000);
                });
            });
        });
    });
}, 6000);
// callbacks nesting -> callback Hell

/*
// Setting Up for Promises
function saveToDB(data, success, failure) {
    let internetSpeed = Math.floor(Math.random() * 10) + 1;
    if (internetSpeed > 4) {
        success();
    }
    else {
        failure();
    }
}
saveToDB("aapka desh", ()=> {
    console.log("Success 1: Data Saved.");
    saveToDB("hello world", ()=> {
        console.log("Success 2 : Data Saved.");
        saveToDB("Shanu Mishra", ()=> {
            console.log("Success 3 : Data Saved.");
        }, ()=> {
            console.log("Success 3: Data Not Saved.");
        });
    }, ()=> {
        console.log("Success 2: Data Not Saved.");
    });
}, ()=> {
    console.log("Success 1: Data Not Saved.");
});
*/
// Refactoring with promises
function saveToDB(data) {
    return new Promise((resolve, reject) => {
        let internetSpeed = Math.floor(Math.random() * 10) +1;
        if(internetSpeed > 4) {
            resolve("Success : Data saved");
        }
        else {
            reject("Failure : weak connection");
        }
    });
}
// type saveToDB("aapka desh"); in console in browser
saveToDB("aapka desh")
.then((result)=> {
    console.log("Success! Data 1 saved");
    console.log("result of promise : ", result);  //  line 63
    return saveToDB("hello world");
})
.then((result)=> {
    console.log("Success! Data 2 saved");
    console.log("result of promise : ", result);  //  line 63
    return saveToDB("Shanu Mishra");
})
.then((result)=> {
    console.log("Success! Data 3 saved");
    console.log("result of promise : ", result);  //  line 63
})
.catch((error)=> {
    console.log("Failure! Weak connection, try again.");
    console.log("error of promise : ", error);  //  line 66
});
