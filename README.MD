# API de impressão de nota

API desenvolvida para retorno de notas fiscais ou de frete

Para DANFEs ( Notas fiscais ) utilize a rota `/danfe`

Para DACTEs ( Conhecimento de frete ) utilize a rota `/danfe`

Para ambas as rotas os parametros devem ser enviados da seguinte forma:

## Query params:

nr_chacesso: < NÚMERO DA CHAVE DE ACESSO DA NOTA>

Será o nome do arquivo pdf

## Body params:

Em text/plain o XML

Exemplo de utilização:

Parametros:

![alt text](https://imgur.com/zLHRi4Y)

![alt text](https://imgur.com/847elxu)

Nota gerada:

![alt text](https://imgur.com/f94TgH0)
