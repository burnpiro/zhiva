export const validNumber = (val: string[] | string | number) => {
  if (Array.isArray(val)) {
    return val.map(v => (v !== undefined ? Number(v) : v));
  } else {
    return val !== undefined ? Number(val) : val;
  }
};
