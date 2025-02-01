/**
 Design priorities
 - Efficient data syncing minimizing calls to the server while ensuring that data is persisted in a reasonable amount of time
 - Some offline caching
 - Data security is not considered
 - Multiple users modfiying the user structure on the server at once is not a priority
 - Allow some parts of the app to be used offline (e.g. practice)
 */

export class User {
	// Actual fields
	#id = '%0';
	#name = '%0'; // user-updatable
	#groupId = '%0'; // user-updatable

	deepCopy(): User {
		const copy = new User();

		copy.#id = this.#id;
		copy.#name = this.#name;
		copy.#groupId = this.#groupId;

		return copy;
	}

	clearUser() {
		this.#id = '%0';
		this.#name = '%0';
		this.#groupId = '%0';
	}

	// Setters
	setName(newValue: string) {
		this.#name = newValue;
	}

	setID(newValue: string) {
		this.#id = newValue;
	}

	setGroupId(newGroupId: string) {
		this.#groupId = newGroupId;
	}

	getId(): string {
		return this.#id;
	}

	getName(): string {
		return this.#name;
	}

	getGroupId() {
		return this.#groupId;
	}
}
