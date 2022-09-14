// used in renderer or main
function createStorage(key: string) {
  key = `FILE_TRANSFER/${key}`;
  return {
    set(value: string) {
      window.utools.db.put({
        _id: key,
        data: value,
      });
    },
    get(): string {
      return window.utools.db.get(key)?.data || '';
    },
  };
}

export const dropzoneDefaultPath = createStorage('DROPZONE_DEFAULT_PATH');

export const receiveFiledir = createStorage('RECEIVE_FILEDIR')
