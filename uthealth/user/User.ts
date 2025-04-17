/**
 Design priorities
 - Efficient data syncing minimizing calls to the server while ensuring that data is persisted in a reasonable amount of time
 - Some offline caching
 - Data security is not considered
 - Multiple users modfiying the user structure on the server at once is not a priority
 - Allow some parts of the app to be used offline (e.g. practice);
 */

export class User {
    // Actual fields
    #patientID = ''
    #clinicianID = ''
    #gender = ''
    #dob = new Date()
    #weight = 0
    #height = 0

    deepCopy(): User {
        const copy = new User()

        copy.#patientID = this.#patientID
        copy.#clinicianID = this.#clinicianID
        copy.#gender = this.#gender
        copy.#dob = new Date(this.#dob)
        copy.#weight = this.#weight
        copy.#height = this.#height

        return copy
    }

    clearUser() {
        this.#patientID = ''
        this.#clinicianID = ''
        this.#gender = ''
        this.#dob = new Date()
        this.#weight = 0
        this.#height = 0
    }

    get patientID(): string {
        return this.#patientID
    }

    set patientID(value: string) {
        this.#patientID = value
    }

    // Clinician ID
    get clinicianID(): string {
        return this.#clinicianID
    }

    set clinicianID(value: string) {
        this.#clinicianID = value
    }

    // Gender
    get gender(): string {
        return this.#gender
    }

    set gender(value: string) {
        this.#gender = value
    }

    // Date of Birth
    get dob(): Date {
        return this.#dob
    }

    set dob(value: Date) {
        if (value instanceof Date) {
            this.#dob = value
        } else {
            throw new Error('dob must be a Date object')
        }
    }

    // Weight
    get weight(): number {
        return this.#weight
    }

    set weight(value: number) {
        this.#weight = value
    }

    // Height
    get height(): number {
        return this.#height
    }

    set height(value: number) {
        this.#height = value
    }
}
