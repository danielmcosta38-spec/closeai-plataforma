// CloseAI: no CloseAI ninguém corre código seu no servidor. O passo «Code» dos
// workflows e as funções criadas à mão corriam num processo que herdava o
// ambiente do servidor (a base de dados, os segredos, as chaves de IA): um
// cliente lia os dados das outras organizações. As funções das apps
// instaladas (a CloseAI) continuam a correr.
export const SEM_CODIGO_DE_UTILIZADOR =
  'O CloseAI não corre código escrito por utilizadores: o passo «Code» e as funções criadas à mão não existem.';
