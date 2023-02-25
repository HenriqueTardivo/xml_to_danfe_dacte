# API de impressão de nota

API desenvolvida para retorno de notas fiscais ou de frete

Para DANFEs ( Notas fiscais ) utilize a rota `/danfe`

Para DACTEs ( Conhecimento de frete ) utilize a rota `/dacte`

Para ambas as rotas os parametros devem ser enviados da seguinte forma:

## Query params:

nr_chacesso: < NÚMERO DA CHAVE DE ACESSO DA NOTA>

Será o nome do arquivo pdf

## Body params:

Em text/plain o XML

## Exemplo de utilização:

Parametros:

![alt text](./files//readme/Captura%20de%20tela%202022-12-16%20162825.png)

![alt text](./files/readme//Captura%20de%20tela%202022-12-16%20162904.png)

Nota gerada:

![alt text](./files/readme//Captura%20de%20tela%202022-12-16%20162858.png)
