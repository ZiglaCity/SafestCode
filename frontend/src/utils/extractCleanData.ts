interface CleanData {
  code: string;
  summary: string[];
  error?: string;
}

/**
 * Cleans and extracts Gemini's response.
 * Handles ```json ... ``` strings and returns structured data.
 */
export function extractCleanData(raw: string): CleanData {
  let trimmed = raw.trim();
  const codeBlockMatch = trimmed.match(/^```json\s*([\s\S]*?)```$/);
  if (codeBlockMatch) {
    trimmed = codeBlockMatch[1].trim();
  }

  let parsed: any = {};
  try {
    parsed = JSON.parse(trimmed);
  } catch (err) {
    console.warn('Failed to parse Gemini JSON, returning raw string.', err);
    return {
      code: trimmed,
      summary: [],
      error: 'Failed to parse Gemini JSON',
    };
  }

  return {
    code: parsed.code || trimmed,
    summary: parsed.summary || [],
    error: parsed.error || undefined,
  };
}
