export const extensions: Record<string, string> = {
  python: 'py',
  typescript: 'ts',
  javascript: 'js',
};

export const mimeTypes: Record<string, string> = {
  python: 'text/x-python',
  javascript: 'application/javascript',
  // typescript: "application/x-typescript", // edge seems to not be supporting this mime type, hence saving the file as music instead of a typescript file 😅
};
