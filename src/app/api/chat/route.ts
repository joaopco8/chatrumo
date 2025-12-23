import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { findBestMatch, DEFAULT_RESPONSE, KnowledgeItem } from '@/lib/knowledge-matcher';

export const runtime = 'nodejs';

/**
 * Matrícula/CS obrigatória para acesso ao chat
 */
const REQUIRED_MATRICULA = '123456';

/**
 * Carrega as bases de conhecimento dos arquivos JSON
 * Cacheia em memória para melhor performance
 */
let knowledgeBaseCache: KnowledgeItem[] | null = null;

function loadKnowledgeBase(): KnowledgeItem[] {
  if (knowledgeBaseCache) {
    return knowledgeBaseCache;
  }

  try {
    // Carrega base de conhecimento original
    const filePath1 = join(process.cwd(), 'data', 'knowledge_base.json');
    const fileContents1 = readFileSync(filePath1, 'utf-8');
    const kb1 = JSON.parse(fileContents1) as KnowledgeItem[];

    // Carrega base de conhecimento estendida do ZTO
    const filePath2 = join(process.cwd(), 'data', 'knowledge_base_zto_extended.json');
    const fileContents2 = readFileSync(filePath2, 'utf-8');
    const kb2 = JSON.parse(fileContents2) as KnowledgeItem[];

    // Carrega base de conhecimento abrangente (respostas completas)
    const filePath3 = join(process.cwd(), 'data', 'knowledge_base_comprehensive.json');
    const fileContents3 = readFileSync(filePath3, 'utf-8');
    const kb3 = JSON.parse(fileContents3) as KnowledgeItem[];

    // Combina as três bases de conhecimento
    // kb3 (comprehensive) vem primeiro para ter prioridade no matching
    knowledgeBaseCache = [...kb3, ...kb1, ...kb2];
    
    console.log(`Knowledge base loaded: ${knowledgeBaseCache.length} items`);
    return knowledgeBaseCache;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    // Retorna array vazio em caso de erro para não quebrar a API
    return [];
  }
}

/**
 * API Route: /api/chat
 * 
 * Processa perguntas do usuário usando a base de conhecimento
 * e retorna a melhor resposta técnica encontrada.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, isAuthenticated } = body;

    // Validação de entrada
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Se o usuário NÃO está autenticado, validar a matrícula
    if (!isAuthenticated) {
      // Verifica se a mensagem contém a matrícula
      if (!message.includes(REQUIRED_MATRICULA)) {
        return NextResponse.json(
          { 
            response: 'Por favor, informe sua matrícula (CS) para acessar o chat.',
            requiresMatricula: true,
            authenticated: false,
          },
          { status: 200 }
        );
      }

      // Matrícula encontrada - autenticar usuário
      // Remove a matrícula da mensagem
      const messageWithoutMatricula = message.replace(REQUIRED_MATRICULA, '').trim();

      // Se a mensagem é APENAS a matrícula (sem pergunta)
      if (messageWithoutMatricula.length === 0) {
        return NextResponse.json(
          { 
            response: 'Matrícula validada com sucesso! Agora você pode fazer suas perguntas sobre revistamento ferroviário.',
            authenticated: true,
            timestamp: new Date().toISOString(),
          },
          { status: 200 }
        );
      }

      // Tem matrícula E pergunta na mesma mensagem
      // Processar a pergunta e autenticar ao mesmo tempo
      const knowledgeBase = loadKnowledgeBase();

      if (knowledgeBase.length === 0) {
        return NextResponse.json(
          { error: 'Knowledge base is not available' },
          { status: 500 }
        );
      }

      const bestMatch = findBestMatch(messageWithoutMatricula, knowledgeBase);
      const response = bestMatch ? bestMatch.answer : DEFAULT_RESPONSE;

      return NextResponse.json(
        { 
          response,
          timestamp: new Date().toISOString(),
          matchedId: bestMatch?.id || null,
          authenticated: true,
        },
        { status: 200 }
      );
    }

    // Usuário JÁ está autenticado - processar pergunta normalmente
    const messageWithoutMatricula = message;

    // Carrega a base de conhecimento
    const knowledgeBase = loadKnowledgeBase();

    if (knowledgeBase.length === 0) {
      return NextResponse.json(
        { error: 'Knowledge base is not available' },
        { status: 500 }
      );
    }

    // Encontra a melhor resposta usando matching inteligente
    // Usa a mensagem sem a matrícula para o matching
    const bestMatch = findBestMatch(messageWithoutMatricula, knowledgeBase);

    // Determina a resposta final
    const response = bestMatch 
      ? bestMatch.answer 
      : DEFAULT_RESPONSE;

    return NextResponse.json(
      { 
        response,
        timestamp: new Date().toISOString(),
        matchedId: bestMatch?.id || null, // Opcional: retorna o ID do item encontrado para debug
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

