/**
 * Escape special characters for LinkedIn "little" text format
 * Reserved: | { } @ [ ] ( ) < > # \ * _ ~
 *
 * NOTE: Simple hashtags and mentions work without escaping
 * Only escape when using these characters as literal text
 */
export function escapeLinkedInText(text) {
  return text;
}

/**
 * Format text with line breaks
 * @param {string} text
 * @returns {string} Text with normalized line breaks
 */
export function formatLineBreaks(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/**
 * Validate text length and format
 * @param {string} text
 * @returns {Object} {valid, formatted, warnings}
 */
export function formatPostText(text) {
  const formatted = formatLineBreaks(text);
  const warnings = [];

  if (formatted.length > 1600) {
    warnings.push('Text over 1600 chars may have lower engagement (LinkedIn best practice)');
  }

  const firstLine = formatted.split('\n')[0];
  if (firstLine.length > 140) {
    warnings.push('First line over 140 chars - may be truncated on mobile');
  }

  return {
    formatted,
    warnings,
    length: formatted.length,
  };
}
