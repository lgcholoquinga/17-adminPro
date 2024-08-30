export abstract class StorageService implements Storage {
	constructor(protected readonly api: Storage) {}

	get length(): number {
		return this.api.length;
	}

	/**
	 * Set data in storage
	 * @param key Identifier unique
	 * @param value Any value to save
	 */
	setItem(key: string, value: unknown): void {
		const data = JSON.stringify(value);
		this.api.setItem(key, data);
	}

	/**
	 * Get item from storage
	 * @param key Identifier unique
	 * @returns Any value
	 */
	getItem<T>(key: string): T | null {
		const data = this.api.getItem(key);

		if (data !== null) {
			JSON.parse(data) as T;
		}

		return null;
	}

	/**
	 * Remove item from storage
	 * @param key Identifier unique
	 */
	removeItem(key: string): void {
		this.api.removeItem(key);
	}

	/**
	 * Clear all data saved in storage
	 */
	clear(): void {
		this.api.clear();
	}

	/**
	 * Get key value
	 */
	key(index: number): string | null {
		return this.api.key(index);
	}
}
