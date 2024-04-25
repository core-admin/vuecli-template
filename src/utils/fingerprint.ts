import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { businesseStorageShortName } from './env';

const key = businesseStorageShortName('fingerprintID');

export async function getFingerprintID() {
  let fingerprintID = localStorage.getItem(key);
  if (fingerprintID) {
    return fingerprintID;
  }

  const fp = await FingerprintJS.load();
  const result = await fp.get();
  fingerprintID = result.visitorId;
  localStorage.setItem(key, fingerprintID);
  return fingerprintID;
}
