// Code: TodoEntity
/*
    Es la entidad que representa un TODO en toda la aplicación.
*/
export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completeAt?: Date | null
    ) { }

    get isCompleted() {
        // Doble negación
        return !!this.completeAt;
    }

    public static fromObject(object: { [key: string]: any }) {
        const { id, text, completeAt } = object;

        if (!id) throw "id is required";
        if (!text) throw "text is required";

        let newCompleteAt;

        if (completeAt) {
            newCompleteAt = new Date(completeAt);
            if (isNaN(newCompleteAt.getTime())) throw "CompleteAt is not a valid date";
        }

        return new TodoEntity(id, text, newCompleteAt);

    }

}