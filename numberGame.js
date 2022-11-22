class Board {
    constructor(boardSize, containerDiv) {
        this.boardSize = boardSize,
        this.containerDiv = containerDiv
    }

    render() {
        const divTable = document.createElement("div");
        divTable.setAttribute("class", "divTable")
        const divTableBody = document.createElement("div");
        divTableBody.setAttribute("class", "divBody");
        divTable.appendChild(divTableBody);
        for (let i = 0; i < this.boardSize; i++) {
            const divTableRow = document.createElement("div");
            divTableRow.setAttribute("class", "divTableRow");
            divTableBody.appendChild(divTableRow);
            for (let j=0; j < this.boardSize; j++) {
                const divTableCell = document.createElement("div");
                divTableCell.id = `div_${i}${j}`;
                divTableCell.innerHTML = `${i}${j}`;
                divTableCell.setAttribute("class", `divTableCell`);
                divTableRow.appendChild(divTableCell);
            }
        }
                
        document.getElementById(this.containerDiv).appendChild(divTable);
    }

    
}