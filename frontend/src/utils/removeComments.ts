/**
 * removeCommentsSafely
 *
 * Removes comments from code while preserving strings, template literals,
 * regex literals, and (optionally) python-style hash comments or HTML comments.
 *
 * NOTE: This is a heuristic, regex-based approach that is robust for many cases.
 * For 100% correctness (strings/regex/edge tokens) consider parsing with an AST parser
 * (e.g., @babel/parser / TypeScript compiler API).
 */
export function removeCommentsFromCode(
  code: string,
  language?: string,
  opts?: {
    preserveShebang?: boolean; // default true
    collapseEmptyLines?: boolean; // default true
    removeHashComments?: boolean; // default true when language is 'python'
  }
): string {
  const preserveShebang = opts?.preserveShebang ?? true;
  const collapseEmptyLines = opts?.collapseEmptyLines ?? true;
  const removeHashComments =
    opts?.removeHashComments ??
    (typeof language === 'string' &&
      ['python', 'py'].includes(language.toLowerCase()));

  if (!code) return code;

  // 1) Preserve shebang if present
  let shebang = '';
  if (preserveShebang) {
    const m = code.match(/^#!.*\r?\n/);
    if (m) {
      shebang = m[0];
      code = code.slice(shebang.length);
    }
  }

  const lang = (language || '').toLowerCase();

  // 2) HTML/XML handling (straight remove <!-- ... -->)
  if (['html', 'htm', 'xml'].includes(lang)) {
    let out = code.replace(/<!--[\s\S]*?-->/g, '');
    if (collapseEmptyLines) out = out.replace(/\r?\n{3,}/g, '\n\n');
    out = out.replace(/[ \t]+$/gm, ''); // trim end-of-line whitespace
    return shebang + out;
  }

  // 3) Python-ish handling: preserve triple quotes and remove # comments
  if (removeHashComments && ['python', 'py'].includes(lang)) {
    // Capture triple quotes, normal strings, and comments:
    const pyPattern =
      /('{3}[\s\S]*?'{3}|"{3}[\s\S]*?"{3}|'(?:\\.|[^'\\\r\n])*'|"(?:\\.|[^"\\\r\n])*"|#.*$)/gm;
    let out = code.replace(pyPattern, (match) => {
      if (match.startsWith('#')) return ''; // remove # comment
      return match; // keep strings / triple-quoted strings intact
    });
    if (collapseEmptyLines) out = out.replace(/\r?\n{3,}/g, '\n\n');
    out = out.replace(/[ \t]+$/gm, '');
    return shebang + out;
  }

  // 4) Default: JS/TS/C-like handling
  // Pattern captures:
  //  - double-quoted strings
  //  - single-quoted strings
  //  - template literals (backticks)
  //  - regex literals /.../flags  (heuristic: require at least one char inside)
  //  - single-line comments //
  //  - block comments /* ... */
  const pattern =
    /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/(?:\\.|[^\/\\\r\n])+\/[gimsuy]*|\/\/[^\n\r]*|\/\*[\s\S]*?\*\/)/g;

  let out = code.replace(pattern, (match) => {
    // Remove single-line and block comments
    if (match.startsWith('//') || match.startsWith('/*')) {
      return '';
    }
    // Otherwise keep strings, template literals, and regex literals
    return match;
  });

  // 5) Optionally remove hash comments even in non-python contexts if requested
  if (opts?.removeHashComments) {
    out = out.replace(/(^|\s)#(?!\!)[^\n\r]*/g, '');
  }

  // 6) Cleanup trailing whitespace and collapse multiple blank lines
  out = out.replace(/[ \t]+$/gm, '');
  if (collapseEmptyLines) {
    out = out.replace(/\r?\n{3,}/g, '\n\n');
  }

  return shebang + out;
}
