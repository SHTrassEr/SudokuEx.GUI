///<reference path="./ISudokuCell.ts" />
///<reference path="../SudokuEx.Bin/SudokuEx.Base/sudokuEx.base.d.ts" />

module SudokuEx.GUI {
    export class SudokuCell implements ISudokuCell {
        private activeClass = "active";
        private filledClass = "filled";
        private emptyClass = "empty";

        private borderTopClass = "bt";
        private borderRightClass = "br";
        private borderBottomClass = "bb";
        private borderLeftClass = "bl";

        private borderClass = "";

        private input: HTMLInputElement;
        private element: HTMLElement;
        private colIndex: number;
        private rowIndex: number;

        private maxValue: number;
        constructor(private dimension: number, private index: number) {
            this.maxValue = dimension * dimension;
            this.colIndex = SudokuEx.Base.SudokuIndexUtils.getColIndex(this.maxValue, index);
            this.rowIndex = SudokuEx.Base.SudokuIndexUtils.getRowIndex(this.maxValue, index); 
            this.borderClass = this.getBorderClass();
            this.input = this.createInputElement();
            this.element = this.createElement(this.input);
        }

        public getCellElement(): HTMLElement {
            return this.element;
        }

        public setValue(value: number): void {
            var c = SudokuEx.Base.SudokuUtils.getCharFromValue(value);
            this.input.value = String.fromCharCode(c);
        }

        public getValueString(): string {
            if (this.input.value) {
                return this.input.value;
            }

            return "0";
        }

        public getValue(): number {
            if (this.input.value) {
                var c = this.input.value.charCodeAt(0);
                return SudokuEx.Base.SudokuUtils.getValueFromChar(c);                    
            } else {
                return 0;
            }
        }

        private getBorderClass(): string {
            return this.getBorderRightClass() + 
                this.getBorderLeftClass() +
                this.getBorderBottomClass() + 
                this.getBorderTopClass();
        }

        private getBorderRightClass(): string {
            if (((this.colIndex + 1) % this.maxValue != 0) && ((this.colIndex + 1) % this.dimension == 0)) {
                return " " + this.borderRightClass;
            }

            return "";
        }

        private getBorderLeftClass(): string {
            if ((this.colIndex % this.maxValue != 0) && (this.colIndex  % this.dimension == 0)) {
                return " " + this.borderLeftClass;
            }

            return "";
        }

        private getBorderBottomClass(): string {
            if (((this.rowIndex + 1) % this.maxValue != 0) && ((this.rowIndex + 1) % this.dimension == 0)) {
                return " " + this.borderBottomClass;
            }

            return "";
        }

        private getBorderTopClass(): string {
            if ((this.rowIndex % this.maxValue != 0) && (this.rowIndex % this.dimension == 0)) {
                return " " + this.borderTopClass;
            }

            return "";
        }

        private createInputElement(): HTMLInputElement {
            var input = document.createElement("input");
            input.setAttribute("maxlength","1");
            input.onfocus = ev => { this.onCellFocus() };
            input.onblur = ev => { this.onCellBlur() };
            return input;
        }

        private createElement(input: HTMLInputElement): HTMLElement {
            var element = document.createElement("li");
            element.setAttribute("class", this.emptyClass + this.borderClass);
            element.appendChild(input);
            return element;
        }

        private onCellFocus() : void {
            this.element.setAttribute("class", this.activeClass + this.borderClass);
        }

        private onCellBlur() : void {
            if (this.getValue() == 0) {
                this.element.setAttribute("class", this.emptyClass + this.borderClass);
            } else {
                this.element.setAttribute("class", this.filledClass + this.borderClass);
            }
        }

    }
}