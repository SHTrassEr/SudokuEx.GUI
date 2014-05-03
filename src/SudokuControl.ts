///<reference path="./ISudokuControl.ts" />
///<reference path="./ISudokuCell.ts" />
///<reference path="./SudokuCell.ts" />

module SudokuEx.GUI {
    export class SudokuControl implements ISudokuControl {
        private fieldElement: HTMLElement;
        private cells: ISudokuCell[];
        private cellsCount: number;

        private sudokuFieldClass = "sudokuField";
        private dimensionClass = "dimension";

        constructor(private dimension: number, private container: HTMLElement) {
            this.checkDimension(dimension);
            this.fieldElement = this.createFieldElement(dimension);
            var maxValue = dimension * dimension;
            this.cellsCount = maxValue * maxValue;
            this.cells = new Array<ISudokuCell>(this.cellsCount);

            for (var i = 0; i < this.cellsCount; i++) {
                var cell = new SudokuCell(dimension, i);
                this.cells[i] = cell;
                this.fieldElement.appendChild(cell.getCellElement());
            }

            container.appendChild(this.fieldElement);
        }

        public fieldToString(): string {
            var s = "";
            for (var i = 0; i < this.cellsCount; i++) {
                s += this.cells[i].getValueString();
            }

            return s;
        }

        private checkDimension(dimension: number): void {
            if (dimension < 2) {
                throw "Dimension must be greater then 1";
            }

            if (dimension > 5) {
                throw "Dimension must be less then 6";
            }
        }

        private createFieldElement(dimension: number): HTMLElement {
            var fieldElement = document.createElement("ul");
            fieldElement.className = this.sudokuFieldClass + " " + this.dimensionClass + dimension;
            return fieldElement;
        }
    }
}