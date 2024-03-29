export const sanitizeConfig = {
  allowedTags: [
    'abbr',
    'acronym',
    'b',
    'blockquote',
    'br',
    'code',
    'div',
    'em',
    'i',
    'li',
    'ol',
    'p',
    'span',
    'strong',
    'table',
    'td',
    'tr',
    'h1',
    'h2',
    'img',
    'h3',
    'h4',
  ],
  allowedAttributes: {
    a: ['href', 'target'],
    img: ['src'],
  },
};
