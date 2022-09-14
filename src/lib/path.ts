export function getFilenameByPath(p: string) {
  return p.replace(/^.*[\\/]/, '');
}

export function getFiledirByPath(p: string) {
  return p.replace(/[^\\/]*$/, '');
}
