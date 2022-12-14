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
        return arrayOfNumbers 
    }

    getRandomNumber(numberList) {
        if (numberList.length >= 1) {
            let result = Math.floor((Math.random() * 100)% numberList.length);
            let retValue = numberList[result]
            let x = numberList.splice(result, 1);
            return retValue
        }
    }

    render() {
        const divTable = document.createElement("div");
        divTable.setAttribute("class", "divTable")
        const divTableBody = document.createElement("div");
        divTableBody.setAttribute("class", "divBody");
        divTable.appendChild(divTableBody);
        document.getElementById(this.containerDiv).appendChild(divTable);
        const numberList = this.generateListOfNumbers();
        for (let row = 0; row < this.boardSize; row++) {
            const divTableRow = document.createElement("div");
            divTableRow.setAttribute("class", "divTableRow");
            divTableBody.appendChild(divTableRow);
            for (let column=0; column < this.boardSize; column++) {
                const number = this.getRandomNumber(numberList);
                this.cellArray[row][column]=new Cell(this, row, column, number);
                console.log(this.cellArray[row][column]);
                this.cellArray[row][column].setNumber(number);
                const divTableCell = document.createElement("div");
                divTableCell.id = `div_${row}${column}`;
                divTableRow.appendChild(divTableCell);
                this.cellArray[row][column].render();
            }
        }
        
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
        return this.number
    }

    setNumber(n) {
        this.number = n;
    }

    isBlank() {
        if (this.number == 0) {
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
        if (this.column == this.board.boardSize-1) {
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
            return this.board["cellArray"][this.row-1][this.column];
        }
    }

    bottomCell() {
        if (this.row == this.board.boardSize-1) {
            return null
        }
        else {
            return this.board["cellArray"][this.row+1][this.column];
        }
    }
    
    move() {
        var n = this.leftCell();
        console.log(typeof n);
        if (n) {
            if (n.isBlank()) {
                this.moveTo(n);
                this.render();
                n.render();
                let result = this.validate();
                if (result) {
                    document.getElementById("winningmessage").innerHTML = "Congratulations, You WON!!";
                }
                return true
            } 
        }
        n = this.rightCell() 
        if (n) {
            if (n.isBlank()) {
                    this.moveTo(n);
                    this.render();
                    n.render();
                    let result = this.validate();
                    if(result) {
                        document.getElementById("winningmessage").innerHTML = "Congratulations, You WON!!";
                    }
                    return true
                }
            }
        n = this.topCell();
        if (n) {
            if (n.isBlank()) {
                this.moveTo(n);
                this.render();
                n.render();
                let result = this.validate();
                if(result) {
                    document.getElementById("winningmessage").innerHTML = "Congratulations, You WON!!";
                }
                return true
            }
        }
        n = this.bottomCell();
        if (n) {
            if (n.isBlank()){
                this.moveTo(n);
                this.render();
                n.render();
                let result = this.validate()
                if(result) {
                    document.getElementById("winningmessage").innerHTML = "Congratulations, You WON!!";
                }
                return true 
            }
        }     
    }

    moveTo(n) {
        let temp = n.number;
        n.number = this.number;
        this.number = temp;
    }

    validate() {
        let count = 1;
        for (let i=0; i<=board.boardSize-1; i++) {
            for (let j=0; j<=board.boardSize-1; j++) {
                if (board.cellArray[i][j].number == count) {
                    count += 1;
                }
                else if (i==board.boardSize-1 && j==board.boardSize-1) {
                    return true 
                }
                else {
                    return false
                }
            } 
        }
    }

    render() {
        const result = this.getNumber()
        const divTableCell = document.getElementById(`div_${this.row}${this.column}`)
        if (result == 0) {
            divTableCell.innerHTML = `<button type="button" id="hole" class="numbercell" style="background:black" onclick="javascript:board.cellArray[${this.row}][${this.column}].move()">&nbsp;</button>`;
        }
        else {
            divTableCell.innerHTML = `<button type="button" id=button_${this.row}${this.column} class="numbercell" onclick="javascript:board.cellArray[${this.row}][${this.column}].move()">${result}</button>`;
        }
        divTableCell.setAttribute("class", `divTableCell`);
    }

}    

   

