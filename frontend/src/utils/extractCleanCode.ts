export default function extractCodeBlock(markdown: string): string {
  const match = markdown.match(/```(?:\w+)?\n([\s\S]*?)```/);
  return match ? match[1].trim() : markdown;
}
