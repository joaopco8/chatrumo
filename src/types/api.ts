export interface ChatRequest {
  message: string;
  isAuthenticated?: boolean; // Indica se o usuário já foi autenticado nesta sessão
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  matchedId?: string | null; // ID do item da base de conhecimento que foi encontrado (opcional, para debug)
  requiresMatricula?: boolean; // Indica se a resposta é sobre necessidade de matrícula
  authenticated?: boolean; // Indica se a autenticação foi bem-sucedida
}

export interface ChatError {
  error: string;
}

