/**
 * Text Normalizer Utility
 * 
 * Funções para normalizar texto para comparação:
 * - Remove acentos
 * - Converte para lowercase
 * - Remove pontuação
 * - Remove espaços extras
 */

/**
 * Remove acentos de uma string
 */
function removeAccents(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Remove pontuação e caracteres especiais
 */
function removePunctuation(text: string): string {
  return text.replace(/[^\w\s]/g, ' ');
}

/**
 * Remove espaços extras e trim
 */
function cleanSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Normaliza um texto para comparação:
 * - Remove acentos
 * - Converte para lowercase
 * - Remove pontuação
 * - Remove espaços extras
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  
  return cleanSpaces(
    removePunctuation(
      removeAccents(text.toLowerCase())
    )
  );
}

/**
 * Tokeniza um texto em palavras individuais
 */
export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized.split(' ').filter(word => word.length > 0);
}

