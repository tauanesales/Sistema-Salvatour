export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MATC84-LABORATORIO-DE-PROGRAMACAO-WEB",
      description: "Projeto MATC84",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
      {
        url: "https://back.matc84.tauane.artadevs.tech/",
        description: "Servidor Vercel",
      },
    ],
    paths: {
      "/user/": {
        post: {
          summary: "Cria um novo usuário",
          description: "Cria um novo usuário",
          operationId: "createUser",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
                examples: {
                  user: {
                    summary: "Exemplo de usuário",
                    value: {
                      name: "usuario",
                      email: "email@example.com",
                      password: "exemplo123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      "/user/{id}": {
        get: {
          summary: "Busca um usuário pelo ID",
          description: "Busca um usuário pelo ID",
          operationId: "getUserById",
          parameters: [
            {
              name: "ID",
              in: "path",
              description: "Id do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Usuário encontrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "nome do usuário",
            },
            email: {
              type: "string",
              description: "Email do usuário",
            },
            password: {
              type: "string",
              description: "Senha do usuário",
            },
          },
          required: ["name", "email", "password"],
        },
      },
    },
  },
  apis: ["./src/routes/*.route.js"],
};