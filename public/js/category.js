function displayRadioValue() {
    var ele = document.getElementsByName('category');
    for(i = 0; i < ele.length; i++) {
    if(ele[i].checked)
    document.getElementById("category").innerHTML
    = ele[i].value;
    }
    }
