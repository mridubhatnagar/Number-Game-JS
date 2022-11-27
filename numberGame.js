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
        // console.log(arrayOfNumbers);
        return arrayOfNumbers 
    }

    getRandomNumber(numberList) {
        console.log(`length of list is: ${numberList.length}`);
        console.log(`list is: ${numberList}`)
        if (numberList.length >= 1) {
            let result = Math.floor((Math.random() * 100)% numberList.length);
            console.log(`element position ${result}`);
            let retValue = numberList[result]
            console.log(`Random Number Value: ${retValue}`)
            let x = numberList.splice(result, 1);
            console.log(`Number popped out from list: ${x}`);
            return retValue
        }
    }

    render() {
        const divTable = document.createElement("div");
        divTable.setAttribute("class", "divTable")
        const divTableBody = document.createElement("div");
        divTableBody.setAttribute("class", "divBody");
        divTable.appendChild(divTableBody);
        const boardObj = new Board(this.boardSize, this.containerDiv);
        const numberList = this.generateListOfNumbers();
        for (let row = 0; row < this.boardSize; row++) {
            const divTableRow = document.createElement("div");
            divTableRow.setAttribute("class", "divTableRow");
            divTableBody.appendChild(divTableRow);
            for (let column=0; column < this.boardSize; column++) {
                const number = this.getRandomNumber(numberList);
                this.cellArray[row][column]=new Cell(boardObj, row, column, number);
                console.log(this.cellArray[row][column]);
                this.cellArray[row][column].setNumber(number)
                const result = this.cellArray[row][column].getNumber()
                const divTableCell = document.createElement("div");
                divTableCell.id = `div_${row}${column}`;
                this.cellArray[row][column].move();
                divTableCell.innerHTML = `<button type="button" onclick="this.cellArray[${row}][${column}]".move()>${result}</button>`;
                divTableCell.setAttribute("class", `divTableCell`);
                divTableRow.appendChild(divTableCell);
            }
        }
                
        document.getElementById(this.containerDiv).appendChild(divTable);
    }

    
}

class Cell {
    constructor(board, row, column, number) {
        this.board = board,
        this.row = row,
        this.column = column, 
        this.number = number
        console.log(this.board, this.row, this.column, this.number);
    }

    getNumber() {
        return this.board['cellArray'][this.row][this.column]
    }

    setNumber(n) {
        this.board['cellArray'][this.row][this.column] = n;
        console.log(this.board['cellArray'][this.row][this.column]);
    }

    isBlank(n) {
        if (n == 0) {
            return true
        }
        else {
            return false
        }
    }

    leftCell() {
        if (this.column == 0) {
            return null
        }
        else {
            return this.board["cellArray"][this.row][this.column-1];
        }
    }
    
    rightCell() {
        if (this.column == 0) {
            return null 
        }
        else {
            return this.board["cellArray"][this.row][this.column+1];
        }
    }

    topCell() {
        if (this.row==0){
            return null
        }
        else {
            return this.board["cellArray"][this.row+1][this.column];
        }
    }

    bottomCell() {
        if (this.row == 0) {
            return null
        }
        else {
            return this.board["cellArray"][this.row-1][this.column];
        }
    }
    
    move() {
        console.log("inside move method")
        var n = this.leftCell();
        console.log(typeof n);
        if (n) {
            if (this.isBlank(n)) {
                this.moveTo(n);
                return true
            } 
        }
        n = this.rightCell() 
        if (n) {
            if (this.isBlank()) {
                    this.moveTo(n);
                    return true
                }
            }
    }

    moveTo(n) {
        const temp = n;
        n = this.number;
        this.number = temp;
    }

}    

   

