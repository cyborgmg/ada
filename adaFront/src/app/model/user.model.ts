export class User {

    constructor(
        public id: string,
        public email: string,
        public password: string,
        public profile: string
    ) {}

    public static getInstance(): User {
        return new User(null, null, null, null);
    }

}

