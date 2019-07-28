const tableHead = document.getElementsByTagName("thead")[0]
const tableBody = document.querySelectorAll("tbody")[0]

// function to remote all child elements
const removeChilds = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

// function to clear table
const emptyCorrelationMatrixContainer = () => {
    removeChilds(tableHead)
    removeChilds(tableBody)
}

// filling a row on table
const fillRowByElement = (data, element, parent, fixTo) => {
    var tr = document.createElement("tr");                
    for(let i = 0; i < data.length; i++) {
        var tc = document.createElement(element);        
        if(fixTo && i > 0) {
            data[i] = data[i].toFixed(fixTo)
            let colorValue = Math.pow(data[i], 2) * 255
            tc.style.backgroundColor = `rgba(${colorValue / 3}, ${colorValue / 3}, ${colorValue}, 1)`
            tc.style.color = "white"
        }
        var text = document.createTextNode(data[i]);  
        tc.appendChild(text)      
        tr.appendChild(tc);                             
    }
    parent.appendChild(tr)
}

// refresh table
const correlationMatrix = (correlationMatrix, classes) => {
    emptyCorrelationMatrixContainer()
    fillRowByElement(["", ...classes], "th", tableHead)

    for(let i = 0; i < classes.length; i++){
        fillRowByElement([classes[i], ...correlationMatrix[i]], "td", tableBody, 2)
    }
}


export default correlationMatrix