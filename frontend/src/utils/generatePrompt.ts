interface Props {
  code: string;
  mode: string;
  language: string;
}

export function generatePrompt({ code, mode, language }: Props): string {
  const modes = mode.split(',').map((m) => m.trim().toLowerCase());

  let prompt = `You are an expert AI code assistant.\n`;
  prompt += `The user submitted ${language} code that may contain issues. Analyze and improve it according to the tasks below.\n\n`;

  prompt += `Original Code:\n${code}\n\n`;

  prompt += `Tasks:\n`;
  for (const m of modes) {
    switch (m) {
      case 'review':
        prompt += `- Review the code for quality, readability, and best practices.\n`;
        break;
      case 'debug':
        prompt += `- Identify and fix any syntax, logical, or runtime bugs.\n`;
        break;
      case 'security':
      case 'secure':
        prompt += `- Check for security flaws and unsafe patterns.\n`;
        break;
      default:
        prompt += `- (Unknown mode: ${m})\n`;
    }
  }

  prompt += `\nOutput Requirements:\n`;
  prompt += `1. Return ONLY valid JSON, nothing else.\n`;
  prompt += `2. JSON MUST have the following structure:\n`;
  prompt += `{\n  "code": "<the fully corrected ${language} code as a string>",\n  "summary": ["<point 1>", "<point 2>", "..."],\n  "error": "<any error messages or empty string>"\n}\n`;
  prompt += `3. The "code" field must contain the corrected code fully executable.\n`;
  prompt += `4. The "summary" array should contain the top 3 most important improvements made.\n`;
  prompt += `5. The "error" field should be empty if no errors occurred.\n`;
  prompt += `6. Keep code formatting intact.`;

  return prompt;
}
