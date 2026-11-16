# 🐾 MiauDota

Aplicativo móvel desenvolvido para apoiar a adoção responsável de gatos, reunindo informações sobre animais disponíveis e organizações de proteção animal.

O projeto foi criado em contexto acadêmico, com implementação incremental e dados simulados para demonstrar a proposta e explorar seus fluxos de navegação.

## Sobre o projeto

O MiauDota busca facilitar a descoberta de gatos disponíveis para adoção e aproximar pessoas interessadas das organizações responsáveis por seu acolhimento.

A proposta valoriza a apresentação de fotografias e informações individualizadas, permitindo conhecer características e necessidades dos felinos antes de iniciar o contato.

A aplicação não aprova automaticamente adotantes nem garante compatibilidade entre tutores e animais. A avaliação e a condução da adoção permanecem sob responsabilidade dos envolvidos.

## Funcionalidades

- Apresentação inicial do aplicativo.
- Tela de login com acesso demonstrativo.
- Cadastro único com seleção de papel:
  - Adotante.
  - Representante de ONG.
  - Apoiador.
- Listagem de gatos disponíveis para adoção.
- Busca nos registros de animais.
- Marcação de favoritos.
- Perfil de ONG com descrição, indicadores e abas.
- Ação de seguir uma organização.
- Interface de chat com conversa simulada e envio local de mensagens.

## Estado atual

O projeto utiliza dados mockados. Informações sobre animais, organizações, indicadores e conversas têm finalidade demonstrativa.

| Recurso | Comportamento demonstrativo |
| --- | --- |
| Login | Permite acessar a aplicação sem autenticação real |
| Cadastro | Representa o preenchimento de dados e a seleção de papel |
| Busca | Consulta os dados simulados disponíveis |
| Favoritos | Mantém a seleção no estado local da interface |
| Perfil da ONG | Exibe informações e indicadores de exemplo |
| Seguir ONG | Alterna o estado visual durante a utilização da tela |
| Chat | Acrescenta mensagens localmente, sem transmissão a outro participante |

A versão demonstrativa não contempla autenticação real, persistência em banco de dados ou comunicação em tempo real. Os estados locais podem ser perdidos ao recarregar a aplicação ou desmontar uma tela.

## Tecnologias

- React Native.
- Expo.
- TypeScript.
- Tamagui.

## Como executar

### Pré-requisitos

- Node.js e npm compatíveis com a versão do Expo utilizada no projeto.
- Git.
- Navegador para execução web.
- Expo Go em um dispositivo compatível ou emulador, para execução móvel.

### Instalação

Clone o repositório e abra sua pasta no terminal.

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npx expo start
```

No terminal do Expo:

- Pressione `w` para abrir a versão web.
- Pressione `a` para abrir em um emulador Android configurado.
- Utilize o Expo Go para ler o QR code e abrir em um dispositivo compatível.

Para iniciar diretamente no navegador:

```bash
npx expo start --web
```

## Organização do código

O código da aplicação está organizado principalmente em:

- `src/assets`: fotografias, ícones, logotipo e formas decorativas.
- `src/components`: componentes reutilizáveis da interface.
- `src/hooks`: hooks compartilhados, incluindo adaptação do layout.
- `src/navigation`: configuração das rotas e tipagem da navegação.
- `src/screens`: telas da aplicação.

## Desenvolvimento

A implementação foi realizada de forma incremental, abrangendo:

1. Definição do tema e do escopo.
2. Planejamento e elaboração dos mockups.
3. Configuração do ambiente.
4. Construção das telas e dos componentes.
5. Implementação dos fluxos de navegação.
6. Ajustes visuais e correções.

O versionamento utiliza mensagens em inglês seguindo o padrão Conventional Commits.

## Contexto acadêmico

O MiauDota foi desenvolvido como projeto acadêmico da disciplina Programação para Dispositivos Móveis no curso de Ciência da Computação da FSG .

Sua proposta é explorar o uso do desenvolvimento móvel no apoio à divulgação de animais e à adoção responsável, constituindo uma base para evolução e avaliação em condições reais.
