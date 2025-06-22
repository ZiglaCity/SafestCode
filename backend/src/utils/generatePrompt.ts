interface Props {
  code: string;
  mode: string;
  language: string;
}

export function generatePrompt({ code, mode, language }: Props): string {
  const modes = mode.split(",").map((m) => m.trim().toLowerCase());

  let prompt = `You are an expert AI code assistant. Analyze the following ${language} code:\n\n${code}\n\n`;

  prompt += `Your tasks:\n`;

  for (const m of modes) {
    switch (m) {
      case "review":
        prompt += `- Review the code for readability, performance, and best practices.\n`;
        break;
      case "debug":
        prompt += `- Identify and fix any syntax or logical bugs.\n`;
        break;
      case "secure":
        prompt += `- Scan for potential security issues and explain how to fix them.\n`;
        break;
      default:
        prompt += `- Note: "${m}" is not a recognized mode.\n`;
    }
  }

  prompt += `\nAfter completing the analysis, respond with:\n`;
  prompt += `1. A corrected version of the code, fully rewritten and ready to paste into an editor.\n`;
  prompt += `2. Clear inline comments where changes were made.\n`;
  prompt += `3. A short summary of what was changed or improved.\n`;
  prompt += `\nRespond in markdown format.`;

  return prompt;
}
