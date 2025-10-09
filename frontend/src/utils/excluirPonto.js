import { database } from '../services/database';

// Função para excluir ponto específico por nome
export const excluirPontoPorNome = (nome) => {
  const pontos = database.listarPontos();
  const ponto = pontos.find(p => p.nome && p.nome.toLowerCase().includes(nome.toLowerCase()));
  
  if (ponto) {
    database.excluirPonto(ponto.id);
    console.log(`Ponto "${ponto.nome}" excluído com sucesso`);
    return true;
  } else {
    console.log(`Ponto com nome "${nome}" não encontrado`);
    return false;
  }
};

// Executar exclusão do ponto "ponto"
excluirPontoPorNome('ponto');