interface ISudokuCell {
    setValue(value: number): void;
    getValue(): number;

    getCellElement(): HTMLElement;
}