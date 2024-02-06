import { getMedicines } from '$lib/medicine';

export async function load() {
	return {
		ideas: getMedicines()
	};
}
