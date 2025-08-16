export default function extractCodeBlock(markdown: string): string {
  const match = markdown.match(/```(?:\w+)?\n([\s\S]*?)```/);
  return match ? match[1].trim() : markdown;
}

export function extractSummary(
  responseText: string,
  language: string
): {
  codeBlock: string;
  summaryLines: string[];
} {
  const [codeBlock, rawSummary] =
    language !== 'python'
      ? responseText.split('// Summary of changes:')
      : responseText.split('# Summary of changes:');

  console.log('Raw Summary: ', rawSummary);
  const summaryLines = rawSummary
    ? language !== 'python'
      ? rawSummary
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => /^\/\/\s*\d+\./.test(line)) // only keep numbered comment lines
          .map((line) => line.replace(/^\/\/\s*\d+\.\s*/, '')) // remove leading `// [number].`
          .slice(0, 4)
      : rawSummary
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => /^#\s*\d+\./.test(line)) // only keep numbered comment lines like `# 1. ...`
          .map((line) => line.replace(/^#\s*\d+\.\s*/, '')) // remove leading `# [number].`
          .slice(0, 4)
    : [];

  return {
    codeBlock,
    summaryLines,
  };
}
