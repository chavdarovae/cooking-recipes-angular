export class MetaReqModel<T> {
    constructor(
        public page: number = 1,
        public entitiesPerPage: number = 50,
        public sort?: string,
        public filter?: T,
    ) {}
}
