/**
 * Knowledge Matcher
 * 
 * Sistema de matching inteligente para encontrar a melhor resposta
 * na base de conhecimento baseado em:
 * - Keywords (peso alto: +2 pontos)
 * - Questions (peso médio: +1 ponto por palavra similar)
 */

import { normalizeText, tokenize } from './text-normalizer';

/**
 * Interface para item da base de conhecimento
 */
export interface KnowledgeItem {
  id: string;
  keywords: string[];
  questions: string[];
  answer: string;
}

/**
 * Resultado do matching com score
 */
export interface MatchResult {
  item: KnowledgeItem;
  score: number;
}

/**
 * Score mínimo para considerar uma resposta válida
 */
const MIN_SCORE_THRESHOLD = 1;

/**
 * Pesos para cálculo de score
 */
const SCORE_WEIGHTS = {
  KEYWORD_MATCH: 2,      // +2 pontos por keyword encontrada
  QUESTION_WORD_MATCH: 1, // +1 ponto por palavra similar em questions
};

/**
 * Verifica se uma keyword está presente no texto normalizado
 */
function matchesKeyword(keyword: string, normalizedText: string): boolean {
  const normalizedKeyword = normalizeText(keyword);
  
  // Match exato da keyword (pode ser frase)
  if (normalizedText.includes(normalizedKeyword)) {
    return true;
  }
  
  // Match de palavras individuais da keyword
  const keywordWords = tokenize(normalizedKeyword);
  const allWordsMatch = keywordWords.every(word => 
    normalizedText.includes(word)
  );
  
  return allWordsMatch;
}

/**
 * Calcula score baseado em palavras similares em questions
 */
function calculateQuestionScore(
  questions: string[],
  normalizedText: string,
  userWords: string[]
): number {
  let score = 0;
  
  for (const question of questions) {
    const normalizedQuestion = normalizeText(question);
    const questionWords = tokenize(normalizedQuestion);
    
    // Conta quantas palavras do usuário aparecem na question
    for (const userWord of userWords) {
      if (questionWords.includes(userWord) && userWord.length > 2) {
        score += SCORE_WEIGHTS.QUESTION_WORD_MATCH;
      }
    }
  }
  
  return score;
}

/**
 * Calcula o score total de um item da base de conhecimento
 */
function calculateScore(
  item: KnowledgeItem,
  normalizedUserMessage: string,
  userWords: string[]
): number {
  let score = 0;
  
  // Score por keywords (peso alto)
  for (const keyword of item.keywords) {
    if (matchesKeyword(keyword, normalizedUserMessage)) {
      score += SCORE_WEIGHTS.KEYWORD_MATCH;
    }
  }
  
  // Score por palavras similares em questions (peso médio)
  score += calculateQuestionScore(
    item.questions,
    normalizedUserMessage,
    userWords
  );
  
  return score;
}

/**
 * Encontra a melhor resposta na base de conhecimento
 * 
 * @param userMessage - Mensagem do usuário
 * @param knowledgeBase - Array de itens da base de conhecimento
 * @returns O item com maior score ou null se nenhum atingir o threshold
 */
export function findBestMatch(
  userMessage: string,
  knowledgeBase: KnowledgeItem[]
): KnowledgeItem | null {
  if (!userMessage || !knowledgeBase || knowledgeBase.length === 0) {
    return null;
  }
  
  // Normaliza a mensagem do usuário
  const normalizedMessage = normalizeText(userMessage);
  const userWords = tokenize(normalizedMessage);
  
  // Calcula score para cada item
  const matches: MatchResult[] = knowledgeBase.map(item => ({
    item,
    score: calculateScore(item, normalizedMessage, userWords),
  }));
  
  // Filtra itens que atingiram o score mínimo
  const validMatches = matches.filter(m => m.score >= MIN_SCORE_THRESHOLD);
  
  if (validMatches.length === 0) {
    return null;
  }
  
  // Ordena por score (maior primeiro)
  validMatches.sort((a, b) => b.score - a.score);
  
  // Retorna o item com maior score
  return validMatches[0].item;
}

/**
 * Resposta padrão quando nenhum match é encontrado
 */
export const DEFAULT_RESPONSE = 
  'Esse assunto foge do escopo técnico ferroviário.';

