# 🚀 Rocketseat - Desafio 01 - Módulo Node.js

# CRUD para Tasks

## Meu primeiro desafio back-end!
### O projeto consiste em uma API em Node.js puro, onde foi adicionado apenas a biblioteca para importar o arquivo .csv


## Sobre o desafio
O objetivo deste desafio foi reforçar de forma prática os conceitos que aprendi neste módulo, além de buscar conhecimento extra para poder completá-lo.

O que foi desenvolvido?
> + Criação de uma task
> + Listagem de todas as tasks
> + Atualização de uma task pelo seu id
> + Remoção de uma task pelo id
> + Atualizar status de uma task para "concluída"
> + Buscar uma task específica utilizando "?search"
> + E o verdadeiro desafio: Importar tasks em massa por um arquivo CSV
 
 Estrutura da task:
> + id
> + title
> + description
> + completed_at
> + updated_at
> + created_at

 Rotas da aplicação:
> + GET /tasks
> + POST /tasks
> + DELETE /tasks/:id
> + PUT /tasks/:id
> + PATCH /tasks/:id/complete

### OBSERVAÇÕES
Como fiz o máximo possível sem consultas, minha parte de verificação se os ids eram válidos ficou diferente do projeto disponibilizado pela Rocketseat, também deixei comentado partes que acabei não compreendendo muito bem.
