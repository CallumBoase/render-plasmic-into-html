import { uploadFile, addNewFileUploadRecord } from './apiCalls.js';

export const uploadFilesThenCreateFileUploadRecords = async (records) => {
	const uploadPromises = records.map(async (record) => {
		const uploadResult = await uploadFile(record);
		await addNewFileUploadRecord(uploadResult, record);
	});

	const results = await Promise.allSettled(uploadPromises);

	const succeeded = results.filter((result) => result.status === 'fulfilled');
	const failed = results.filter((result) => result.status === 'rejected');

	return {succeeded: succeeded.length, failed: failed.length};

};