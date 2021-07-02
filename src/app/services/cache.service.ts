import { Injectable } from '@angular/core'
// credit: https://maurogarcia.dev/maurogarcia.dev/posts/client-side-caching-with-angular/

@Injectable()
export class CacheService {
	constructor() { }

	save(options: LocalStorageSaveOptions) {
		// Set default values for optionals
		options.expirationMins = options.expirationMins || 0

		// Set expiration date in miliseconds
		const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0
		
		const record = {
			value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
			expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
			hasExpiration: expirationMS !== 0 ? true : false
		}
		localStorage.setItem(options.key, JSON.stringify(record))
	}

	load(key: string) {
		// Get cached data from localstorage
		const item = localStorage.getItem(key)
		if (item !== null) {
			const record = JSON.parse(item)
			const now = new Date().getTime()
			// Expired data will return null
			if (!record || (record.hasExpiration && record.expiration <= now)) {
				return null
			} else {
				return this.isJson(record.value) ? JSON.parse(record.value) : record.value;
			}
		}
		return null
	}

	remove(key: string) {
		localStorage.removeItem(key)
	}

	cleanLocalStorage() {
		localStorage.clear()
	}

	isJson(record: any) {
		try {
			JSON.parse(record);
		} catch (e) {
			return false;
		}
		return true;
	}
}

export class LocalStorageSaveOptions {
	key: string
	data: any
	expirationMins?: number
}