function arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    const fields = ["name1", "name2", "name3"];
    const cellValue = row[column.property];
    if (cellValue && fields.includes(column.property)) {
        const prevRow = this.tableData[rowIndex - 1];
        let nextRow = this.tableData[rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
            return { rowspan: 0, colspan: 0 };
        } else {
            let countRowspan = 1;
            while (nextRow && nextRow[column.property] === cellValue) {
                nextRow = this.tableData[++countRowspan + rowIndex];
            }
            if (countRowspan > 1) {
                return { rowspan: countRowspan, colspan: 1 };
            }
        }
    }
}