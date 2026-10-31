# Controle de Carga Moedora — Google Apps Script

Versão Web App (GAS) do `moagem-tracker.html`. A interface e os cálculos são
os mesmos. A única diferença é o armazenamento: em vez de `window.storage`, os
dados ficam salvos nas **Propriedades do Script**, compartilhadas por todos
que acessam o link.

## Arquivos

| Arquivo           | Conteúdo                                                   |
|-------------------|------------------------------------------------------------|
| `Code.gs`         | Backend: `doGet`, `getAllData`, `getData`, `setData`       |
| `Index.html`      | Interface completa (Painel, Nova medição, Histórico, Moinhos) |
| `appsscript.json` | Manifesto (fuso horário de São Paulo, V8, Web App)         |

## Como publicar

1. Acesse https://script.google.com e clique em **Novo projeto**.
2. Cole o conteúdo de `Code.gs` no arquivo `Código.gs` que já vem criado.
3. Clique em **+ → HTML**, dê o nome `Index` (exatamente assim) e cole o conteúdo de `Index.html`.
4. (Opcional) Em **Configurações do projeto**, marque *Mostrar arquivo de manifesto "appsscript.json"* e cole o conteúdo de `appsscript.json`.
5. Clique em **Implantar → Nova implantação → Tipo: App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: escolha conforme a necessidade (ex.: *Qualquer pessoa da organização*)
6. Autorize e abra a URL gerada.

Depois de alterar o código, use **Implantar → Gerenciar implantações → Editar → Nova versão**
para atualizar o link existente.

## Observações

- Valores maiores que 9 KB são divididos em várias propriedades automaticamente.
  O limite total das Propriedades do Script é de ~500 KB, o que equivale a
  alguns milhares de medições.
- Para apagar todos os dados, rode a função `resetAllData` no editor.
