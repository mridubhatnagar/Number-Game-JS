class Board {
    constructor(boardSize, containerDiv) {
        this.boardSize = boardSize,
        this.containerDiv = containerDiv,
        this.cellArray=new Array(this.boardSize)
        for( let x=0;x<this.boardSize;x++) {
            this.cellArray[x]=new Array(this.boardSize);    
        }       
    }

    generateListOfNumbers() {
        const arrayOfNumbers = []
        for(let i=0; i<this.boardSize*this.boardSize; i++) {
            arrayOfNumbers.push(i);
        }
        console.log(arrayOfNumbers);
        return arrayOfNumbers 
    }

    getRandomNumber(numberList) {
        console.log(numberList);
        if (numberList.length >= 1) {
            let result = Math.floor((Math.random() * (numberList.length-1)));
            console.log(`Random Number Value: ${numberList[result]}`)
            return numberList[result]
        }
    }

    removeNumberFromArray(number, numberList) {
        let y = numberList.indexOf(number);
        let x = numberList.splice(y, 1);
        console.log(`Number popped out from list: ${x}`);
    }

    render() {
        const divTable = document.createElement("div");
        divTable.setAttribute("class", "divTable")
        const divTableBody = document.createElement("div");
        divTableBody.setAttribute("class", "divBody");
        divTable.appendChild(divTableBody);
        const numberList = this.generateListOfNumbers();
        for (let row = 0; row < this.boardSize; row++) {
            const divTableRow = document.createElement("div");
            divTableRow.setAttribute("class", "divTableRow");
            divTableBody.appendChild(divTableRow);
            for (let column=0; column < this.boardSize; column++) {
                const number = this.getRandomNumber(numberList);
                this.removeNumberFromArray(number, numberList);
                // this.cellArray[row][column]=new cell(this.board,row,column,number);
                const divTableCell = document.createElement("div");
                divTableCell.id = `div_${row}${column}`;
                divTableCell.innerHTML = `${row}${column}`;
                divTableCell.setAttribute("class", `divTableCell`);
                divTableRow.appendChild(divTableCell);
            }
        }
                
        document.getElementById(this.containerDiv).appendChild(divTable);
    }

    
}