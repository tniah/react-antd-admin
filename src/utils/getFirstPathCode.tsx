
export const getStrTimesIndex = (str: string, ch: string, num: number) => {
  let x = str.indexOf(ch);
  for (let i = 0; i < num; i++) {
    x = str.indexOf(ch, x + 1);
  }
  return x;
}

export const getFirstPathCode = (path: string) => {
  const index0 = getStrTimesIndex(path, '/', 0);
  const index1 = getStrTimesIndex(path, '/', 1);

  return path.slice(index0 + 1, index1 > 0 ? index1 : path.length);
};