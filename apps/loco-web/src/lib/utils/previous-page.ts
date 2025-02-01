export const setPreviousPage = (pageUrl: string) => {
  sessionStorage.setItem('previousPage', pageUrl);
};

export const getPreviousPage = (): string => {
  return sessionStorage.getItem('previousPage') ?? '';
};
