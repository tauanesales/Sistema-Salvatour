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
        url: "https://back.matc84.tauane.artadevs.tech",
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
              name: "id",
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
        delete: {
          summary: "Deleta um usuário pelo ID",
          description: "Deleta um usuário pelo ID",
          operationId: "deleteUserById",
          parameters: [
            {
              name: "id",
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
              description: "Usuário deletado com sucesso",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
        patch: {
          summary: "Atualiza um usuário pelo ID",
          description:
            "Atualiza os dados de um usuário pelo ID, exceto o email",
          operationId: "updateUserById",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "Id do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Nome do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                  },
                  required: ["name", "password"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de atualização de usuário",
                    value: {
                      name: "novoNome",
                      password: "novaSenha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Usuário atualizado com sucesso",
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
      "/admin/users/": {
        get: {
          summary: "Busca todos os usuários (admin)",
          description:
            "Retorna uma lista de todos os usuários para administração",
          operationId: "findAllUsers",
          responses: {
            200: {
              description: "Lista de usuários",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/admin/user/{id}": {
        "delete": {
          "summary": "Deleta um usuário pelo ID (admin)",
          "description": "Deleta um usuário pelo ID para administração",
          "operationId": "deleteUserById",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Id do usuário a ser deletado",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Id do administrador"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Usuário deletado com sucesso"
            },
            "404": {
              "description": "Usuário não encontrado"
            }
          }
        }
      },      
      "/auth/login": {
        post: {
          summary: "Login de usuário",
          description: "Autentica um usuário com email e senha",
          operationId: "loginUser",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                      description: "Email do usuário",
                    },
                    password: {
                      type: "string",
                      description: "Senha do usuário",
                    },
                  },
                  required: ["email", "password"],
                },
                examples: {
                  credentials: {
                    summary: "Exemplo de credenciais",
                    value: {
                      email: "email@example.com",
                      password: "senha123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login bem-sucedido",
              headers: {
                Authorization: {
                  description: "Token de autenticação JWT",
                  schema: {
                    type: "string",
                  },
                },
              },
            },
            401: {
              description: "Credenciais inválidas",
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
              description: "Nome do usuário",
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
