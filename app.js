const table = document.getElementById("resultTable")
console.dir(table)

let row = table.querySelector("#labels")
console.dir(row)

const lim_a = 70;
const lim_s = 70;


const tableBody = table.querySelector("tbody")
console.log(tableBody)

for (let ca = 2; ca <= lim_a; ca++) {
    const tr = document.createElement("tr");


    for (let cs = 1; cs <= lim_s; cs++) {
        const lp = document.createElement("td")


        if (cs == ca + 1) {
            lp.classList.add("one");            
        };

        if (cs == (ca + 2)) {
            lp.innerText = " " + (ca+2);
            lp.classList.add("nums");
        } else {

                if (((cs - (ca - cs)) >= 0) || (cs+cs == ca)) {

                    if (cs <= ca) {
                        let result = cs + "/" + ca;

                        //////////// result text (all)
                        //lp.innerText = result;

                        lp.id = result;
                    } else {
                        lp.innerText = '';
                        lp.classList.add('sga')
                    }
                } else {
                    lp.classList.add("dnf")
            }
            
        }

        if ((cs+cs+1 == ca) || (cs+cs+2 == ca)) {
            lp.innerText = ca
            lp.classList.add("ca_nums")
        }

        // lp.id = lp.innerText
        // lp.classList.add("lp")
        tr.appendChild(lp) 
        // lp.addEventListener("click", showLP.bind(null, lp.textContent))
        // lp.addEventListener("mouseover", () => {lp.classList.add("hoveringover")})
        // lp.addEventListener("mouseleave", () => {lp.classList.remove("hoveringover")})
        
    }
    tableBody.appendChild(tr)
}

console.log(tableBody)

let gradientcolor = 0;

for (let outcome in counts) {
    let attempted = outcome%100;
    let solved = (outcome - attempted)/100;
    console.log(outcome, attempted, solved)
    let result = solved + '/' + attempted;

    let tile = document.getElementById(result);
    if (tile) {
        tile.classList.add("acheived");
        if (gradientcolor) {
            tile.style.backgroundColor = gradientcolor(counts[outcome])
        } else {
            tile.style.backgroundColor = "#008000";
        }
    }
}

let resultText = document.getElementById("resultText")
resultText.onclick("handleResultText()")

function handleResultText() {
    console.log("yes")
    for (let outcome in counts) {
        let attempted = outcome%100;
        let solved = (outcome - attempted)/100;
        console.log(outcome, attempted, solved)
        let result = solved + '/' + attempted;
    
        let tile = document.getElementById(result);
        if (tile) {
            tile.classList.add("acheived");
            tile.innerText = counts[outcome]
        }
    }
}