import { mimeTypes, extensions } from './extensions';

export const saveFile = (code: string, language: string) => {
  const fileContent = code;
  const fileType = mimeTypes[language] || 'text/plain';
  const extension = extensions[language];
  const fileName = `main.${extension}`;
  console.log('File type', fileType);

  const blob = new Blob([fileContent], {
    type: fileType,
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('Code file saved as', fileName);
};
