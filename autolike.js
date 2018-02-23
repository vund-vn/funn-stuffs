/**
 * AUTOLIKE ALL POST OF A FACEBOOK TIMELINE
 */

// STEP 0: Mở timeline nạn nhân, scroll xuống (Ctrl + PageDown) đến một phạm vi mong muốn.

// STEP 1: Thu thập tọa độ top của tất cả các nút like
var divs = document.getElementsByTagName("DIV");
var buttons = [];
for(var i = 0; i < divs.length; i++) {
    if (divs[i].getAttribute("class") == "_khz _4sz1" && divs[i].parentNode.getAttribute("class") !== "_6a _3-me" && divs[i].parentNode.getAttribute("class") !== "_4qo2 _360f") {
        var rect = divs[i].parentNode.getBoundingClientRect();
        console.log(divs[i])
        buttons.push(rect.top);
    }
}

// STEP 2: Scroll xuống dựa trên tọa độ đã thu thập, nếu đặt chuột ở 1 vị trí đặc biệt, từng nút like sẽ được hover trong 2s để hiện ra Reactions.
// Nếu máy cấu hình yếu, 2s có thể là không đủ, cần tăng thêm. Bước này tốn rất nhiều thời gian
function doScroll(buttons) {
    if(buttons.length === 0) return;
    else setTimeout(function() {
        window.scrollTo(0, buttons[0] - 97);
        buttons.shift();
        doScroll(buttons);
    }, 2000);
}

doScroll(buttons);

// STEP 3: Thu thập hết các nút Reaction cần click.
// Muốn chỉ thả tim/giận dữ, etc. dùng đoạn này
var reacts = []
var x = document.getElementsByTagName("SPAN");
    for(var i =0; i<x.length; i++) {
        if(x[i].getAttribute("aria-label") == "Love") {
            reacts.push(x[i]);
        }
    }

console.log(reacts);

// Muốn random thì dùng đoạn này
var reacts = []
var allReacts = []
var x = document.getElementsByTagName("DIV");
for(var i = 0; i < x.length; i++) {
    if(x[i].getAttribute("aria-label") == "Reactions") {
        allReacts.push(x[i]);
    }
}
for(var i =0; i<allReacts.length; i++) {
    reacts.push(allReacts[i].children[Math.floor(Math.random() * 6)]);
}

console.log(reacts);

// STEP 4: Click Reaction.
function doReact(reacts) {
    if(reacts.length === 0) return;
    else setTimeout(function() {
        console.log('click', reacts[0]);
        reacts[0].click();
        reacts.shift();
        doReact(reacts);
    }, 1000);
}

doReact(reacts);