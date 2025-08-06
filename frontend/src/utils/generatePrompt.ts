interface Props {
  code: string;
  mode: string;
  language: string;
}

export function generatePrompt({ code, mode, language }: Props): string {
  const modes = mode.split(",").map((m) => m.trim().toLowerCase());

  let prompt = `You are an expert AI code assistant.\n`;
  prompt += `The user has submitted ${language} code that may contain issues. Your task is to analyze and improve it.\n\n`;

  prompt += `Here is the code:\n${code}\n\n`;

  prompt += `Tasks:\n`;

  for (const m of modes) {
    switch (m) {
      case "review":
        prompt += `- Review the code for quality and best practices.\n`;
        break;
      case "debug":
        prompt += `- Identify and fix bugs (syntax, logical, runtime).\n`;
        break;
      case "secure":
        prompt += `- Check for security flaws and unsafe patterns.\n`;
        break;
      default:
        prompt += `- (Unknown mode: ${m})\n`;
    }
  }

  prompt += `\n Output Format:\n`;
  prompt += `Return ONLY a valid ${language} file as the FIRST and MAIN output, enclosed in a single \`\`\`${language}\` code block.\n`;
  prompt += `DO NOT write any explanations, summaries, or markdown outside of the code block.\n`;
  prompt += `If you want to add a summary or changes made, put them as comments INSIDE the code block inline\n`;
  prompt += `Provide the fully corrected version of the code first. After that, briefly summarize the top 3 most important improvements made in a numbered list, starting with 'Summary of changes:'.`;
  prompt += `The final output MUST be something that can be copied directly into an editor and executed.\n`;

  return prompt;
}
