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

}