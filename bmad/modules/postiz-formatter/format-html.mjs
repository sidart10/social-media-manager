/**
 * Postiz HTML Formatter
 * Converts plain text to Postiz-compliant HTML
 *
 * Postiz Requirements:
 * - Each paragraph wrapped in <p>...</p>
 * - Allowed tags: h1, h2, h3, u, strong, li, ul, p
 * - Cannot nest u + strong together
 */

/**
 * Format plain text for Postiz
 * @param {string} text - Plain text content
 * @returns {string} - Postiz-compliant HTML
 */
function formatForPostiz(text) {
  // Split by double newlines (paragraph breaks)
  const sections = text.split(/\n\n+/);
  const htmlParts = [];

  for (const [index, section] of sections.entries()) {
    const trimmed = section.trim();

    // Empty section = spacing
    if (!trimmed) {
      htmlParts.push('<p> </p>');
      continue;
    }

    // Detect headers
    if (trimmed.startsWith('### ')) {
      htmlParts.push(`<h3>${applyInlineFormatting(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      htmlParts.push(`<h2>${applyInlineFormatting(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      htmlParts.push(`<h1>${applyInlineFormatting(trimmed.slice(2))}</h1>`);
      continue;
    }

    // Handle bullet lists (check if section contains bullet lines)
    const lines = trimmed.split('\n');
    const hasBullets = lines.some((line) => /^[•\-*]\s/.test(line.trim()));

    if (hasBullets) {
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (/^[•\-*]\s/.test(trimmedLine)) {
          // Bullet line - keep bullet symbol
          const content = trimmedLine.replace(/^[•\-*]\s*/, '');
          htmlParts.push(`<p>• ${applyInlineFormatting(content)}</p>`);
        } else {
          // Non-bullet line in bullet section (like intro text)
          htmlParts.push(`<p>${applyInlineFormatting(trimmedLine)}</p>`);
        }
      }
    } else {
      // Regular paragraph
      htmlParts.push(`<p>${applyInlineFormatting(trimmed)}</p>`);
    }

    // Add spacing after major sections (before headers or after bullet lists)
    if (index < sections.length - 1) {
      const nextSection = sections[index + 1].trim();
      if (/^#{1,3}\s/.test(nextSection) || /^\*\*/.test(nextSection)) {
        htmlParts.push('<p> </p>');
      }
    }
  }

  return htmlParts.join('');
}

/**
 * Apply inline formatting (bold only for now)
 * @param {string} text
 * @returns {string}
 */
function applyInlineFormatting(text) {
  // Bold: **text** → <strong>text</strong>
  return text.replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export { formatForPostiz };
