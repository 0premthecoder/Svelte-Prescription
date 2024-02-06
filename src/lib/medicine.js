// @ts-nocheck
import { ID, Permission, Query, Role } from 'appwrite';
import { appwrite } from '$lib/appwrite';

const IDEAS_DATABASE_ID = '65c240eba770e4a404dc'; // Replace with your database ID
const IDEAS_COLLECTION_ID = '65c241312108bac6f0e4'; // Replace with your collection ID

export async function getMedicines() {
	return await appwrite.databases.listDocuments(
		IDEAS_DATABASE_ID,
		IDEAS_COLLECTION_ID,
		// Use a query to show the latest ideas first
		[Query.orderDesc('$createdAt')]
	);
}

// @ts-ignore
export async function addMedicines(PatientName, DoctorName, Medic) {
	
	const  documentId = await appwrite.databases.createDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, ID.unique(), {
		PatientName,
		DoctorName,
		Medic,
	})
	return documentId

}

// @ts-ignore
export async function deleteMedicines(id) {
	await appwrite.databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
}
