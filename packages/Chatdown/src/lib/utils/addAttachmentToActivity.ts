import * as fs from 'fs-extra';
import * as mimeTypes from 'mime-types';
import fetch, { RequestInit } from 'node-fetch';
import * as path from 'path';
import { CardContentTypes, isCard } from '../enums';
import { Activity, Attachment } from '../serializable';
import { mapTrim } from './mapTrim';

let workingDirectory;

export function setWorkingDirectory(wd: string): void {
  workingDirectory = wd;
}

/**
 * Adds an attachment to the activity. If a mimetype is
 * specified, it is used as is. Otherwise, it is derived
 * from the file extension.
 *
 * @param {Activity} activity The activity to add the attachment to
 * @param {string} attachmentSource
 *
 * @returns {Promise<number>} The new number of attachments for the activity
 */
export async function addAttachmentToActivity(activity: Activity, attachmentSource: string) {
  let [contentUrl, contentType = ''] = attachmentSource.trim().split(' ').map(mapTrim);
  if (contentType) {
    contentType = contentType.toLowerCase();
    if (CardContentTypes[contentType]) {
      contentType = CardContentTypes[contentType];
    }
  } else {
    contentType = mimeTypes.lookup(contentUrl) || CardContentTypes[path.extname(contentUrl)];

    if (!contentType && contentUrl.startsWith('http')) {
      const { HTTP_PROXY, HTTPS_PROXY } = process.env;
      const options: RequestInit = { method: 'HEAD' };
      if (HTTPS_PROXY || HTTP_PROXY) {
        options.agent = contentUrl.startsWith('https') ? require('https-proxy-agent')(HTTPS_PROXY) : require('http-proxy-agent')(HTTP_PROXY);
      }
      let response = await fetch(contentUrl, options);
      contentType = (response.headers.get('content-type') as string).split(';', 1)[0];
    }
  }

  const charset = mimeTypes.charset(contentType);

  // if not a url
  if (!contentUrl.startsWith('http')) {
    // read the file
    let content = await readAttachmentFile(contentUrl, contentType);
    // if it is not a card
    if (!isCard(contentType) && charset !== 'UTF-8') {
      // send as base64
      contentUrl = `data:${ contentType };base64,${ Buffer.from(content).toString('base64') }`;
      content = undefined;
    } else {
      contentUrl = undefined;
    }
    return (activity.attachments || (activity.attachments = [])).push(new Attachment({
      contentType,
      contentUrl,
      content
    }));
  }
  // send as contentUrl
  return (activity.attachments || (activity.attachments = [])).push(new Attachment({ contentType, contentUrl }));
}

/**
 *
 * @param fileLocation
 * @param contentType
 */
async function readAttachmentFile(fileLocation: string, contentType: string) {
  let resolvedFileLocation = path.resolve(path.join(workingDirectory, fileLocation));
  let exists = fs.pathExistsSync(resolvedFileLocation);
  // fallback to cwd
  if (!exists) {
    resolvedFileLocation = path.resolve(fileLocation);
  }
  // Throws if the fallback does not exist.
  if (contentType.includes('json') || isCard(contentType)) {
    return fs.readJson(resolvedFileLocation);
  } else {
    return fs.readFile(resolvedFileLocation);
  }
}
