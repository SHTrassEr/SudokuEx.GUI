interface ISudokuCell {
    setValue(value: number): void;
    getValue(): number;
    getValueString(): string;

    getCellElement(): HTMLElement;
}