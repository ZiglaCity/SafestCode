import { Analyzer } from '../../src/api/analyzer';
import { testCases } from './sampleTest';

export async function runTest(
  language: 'typescript' | 'javascript' | 'python'
) {
  const code = testCases[language];
  const mode = 'review,debug,security';

  console.log(`\n=== Running test for ${language} ===\n`);
  const result = await Analyzer({ code, language, mode });

  if (!result.success) {
    console.error('Analysis failed:', result.error);
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(result.data as string);
  } catch {
    console.warn('Failed to parse AI output as JSON. Raw output:');
    console.log(result.data);
    return;
  }

  console.log('Corrected Code:\n', parsed.code);
  console.log('Summary of changes:\n', parsed.summary);
}
