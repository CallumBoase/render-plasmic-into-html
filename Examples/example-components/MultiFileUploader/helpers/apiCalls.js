import axios from 'axios';
import * as KnackAPI from 'knack-api-helper';
import globals from '../globals.js';

const kn = globals.Knack;

const knackAPI = new KnackAPI({
  auth: 'view-based',
  applicationId: kn.applicationId,
  userToken: window.Knack.getUserToken()
});

export const uploadFile = async (records) => {

  const formData = new FormData();

  const fileExtension = records.file.name.split('.').pop();
  const newFileName = records.newFileName && records.newFileName.length > 0 ? records.newFileName : null;
  const fileName = newFileName ? `${newFileName}.${fileExtension}` : records.file.name;
  formData.append('files', records.file, fileName);

  const response = await axios.post(
    `https://api.knack.com/v1/applications/${kn.applicationId}/assets/file/upload`,
    formData,
    {
      headers: {
        'x-knack-rest-api-key': 'knack',
        'x-knack-application-ID': kn.applicationId,
      },
    }
  );
  return response.data;

};

export const addNewFileUploadRecord = async (uploadResult, records) => {

  const body = {}
  body[kn.objects.fileUploads.fields.file] = uploadResult.id;
  body[kn.objects.fileUploads.fields.category] = records.category;
  body[kn.objects.fileUploads.fields.member] = [records.member];
  body[kn.objects.fileUploads.fields.description] = records.description;

  const result = await knackAPI.post({
    scene: kn.objects.fileUploads.addFileUploadForm.scene,
    view: kn.objects.fileUploads.addFileUploadForm.view,
    body
  });
  return result;

};

export const getMemberOptions = async () => {

  const results = await knackAPI.getMany({
    scene: kn.objects.members.gridOfMembers.scene,
    view: kn.objects.members.gridOfMembers.view,
    format: 'raw'
  });
  const members = results.records.map((record) => {
    return {id: record.id, identifier: record[kn.objects.members.fields.memberName]}
  });
  return members;

};
