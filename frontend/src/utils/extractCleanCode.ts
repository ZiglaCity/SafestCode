export default function extractCodeBlock(markdown: string): string {
  const match = markdown.match(/```(?:\w+)?\n([\s\S]*?)```/);
  return match ? match[1].trim() : markdown;
}

export function extractSummary(responseText: string): {
  codeBlock: string;
  summaryLines: string[];
} {
  const [codeBlock, rawSummary] = responseText.split("// Summary of changes:");
  const summaryLines = rawSummary
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\/\/\s*\d+\./.test(line)) // only keep numbered comment lines
    .map((line) => line.replace(/^\/\/\s*\d+\.\s*/, "")) // remove leading `// [number].`
    .slice(0, 4);

  return { codeBlock, summaryLines };
}
