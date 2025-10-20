###### **Adicionar produto**

curl -X POST -H 'Content-Type: application/json' -d '{"nome":"", "preco":0.00}' http://localhost:4000/admin/adicionar



###### **Adicionar imagem**

curl -X PATCH -H 'Content-Type: application/json' -d '{"imagem":"" (, "remover":true)}' http://localhost:4000/admin/:id/imagem



###### **Atualizar a quantidade**

curl -X PATCH -H 'Content-Type: application/json' -d '{"quantidade":0}' http://localhost:4000/admin/:id/quantidade



###### **Atualizar a categoria**

$ curl -X PATCH -H 'Content-Type: application/json' -d '{"categoria":""}' http://localhost:4000/admin/:id/categoria

