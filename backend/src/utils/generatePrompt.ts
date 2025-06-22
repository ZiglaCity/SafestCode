interface Props {
  code: string;
  mode: string;
  language: string;
}

export function generatePrompt(body: Props): string {
  let prompt: string = body.code;
  prompt += ` Using the above code as your reference, rewrite the entire code properly in ${body.language} and in a format that can be copied and pasted correctly into an editor. And; `;
  const modes = body.mode.split(",").map((s) => s.trim());
  for (const mode of modes) {
    switch (mode) {
      case "review":
        prompt +=
          "Review it and check for any improvements that than can be made. ";
      case "debug":
        prompt += "Debug it and correct all forms of errors. ";
      case "secure":
        prompt +=
          "Check the code properly for any forms of vulnerabilities and security flaws.";
    }
  }
  prompt +=
    "Rewrite the corrected version... well documented as brief comments showing the differences made.";
  console.log(prompt);
  return prompt;
}
