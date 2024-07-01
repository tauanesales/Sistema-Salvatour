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
        url: "{protocol}://{host}",
        description: "Servidor Dinâmico",
        variables: {
          protocol: {
            default: "http",
            enum: ["http", "https"],
          },
          host: {
            default: "localhost:3000",
          },
        },
      },
      {
        url: "https://back.matc84.tauane.artadevs.tech",
        description: "Servidor Vercel (Produção)",
      },
    ],
    paths: {
      "/auth/register": {
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
                      city: "Salvador",
                      state: "Bahia",
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
      "/auth/check-mail": {
        post: {
          summary: "Verifica email",
          description:
            "Verifica se o email digitado existe no banco de dados, se sim, envia um token para o email do usuário",
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
                  },
                  required: ["email"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de email",
                    value: {
                      email: "email@example.com",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Token enviado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
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
      "/auth/verify-token/{token}": {
        get: {
          summary: "Verifica token",
          description: "Verifica se o token digitado é válido",
          parameters: [
            {
              name: "token",
              in: "path",
              description: "Token do usuário",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Token válido!",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
                  },
                },
              },
            },
            404: {
              description: "Token expirado ou inválido!",
            },
          },
        },
      },
      "/auth/modify-password": {
        post: {
          summary: "Alteração de senha do usuário",
          description: "Altera a senha do usuário",
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
                      description: "Nova senha do usuário",
                    },
                  },
                  required: ["email", "password", "token"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de modificação de senha",
                    value: {
                      email: "email@example.com",
                      password: "Password1*",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Senha alterada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PasswordChangeResponse",
                  },
                },
              },
            },
            400: {
              description: "Dados inválidos",
            },
            404: {
              description: "Usuário não encontrado",
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
              description: "ID do usuário",
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
      "/user/": {
        delete: {
          summary: "Deleta um usuário pelo token",
          description: "Deleta um usuário pelo token",
          operationId: "deleteUserByToken",
          security: [
            {
              bearerAuth: [],
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
          summary: "Atualiza um usuário pelo token",
          description:
            "Atualiza os dados de um usuário pelo token, exceto o email",
          operationId: "updateLoggedUser",
          security: [
            {
              bearerAuth: [],
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
                    city: {
                      type: "string",
                      description: "Cidade",
                    },
                    state: {
                      type: "string",
                      description: "Estado",
                    },
                  },
                  required: ["name", "password", "city", "state"],
                },
                examples: {
                  user: {
                    summary: "Exemplo de atualização de usuário",
                    value: {
                      name: "novoNome",
                      password: "novaSenha123",
                      city: "Aracaju",
                      state: "Sergipe",
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
      "/user/me": {
        get: {
          summary: "Busca dados do usuário autenticado",
          description:
            "Retorna os dados do usuário autenticado usando Bearer Token",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Dados do usuário",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            401: {
              description: "Token não fornecido ou inválido",
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
          security: [
            {
              bearerAuth: [],
            },
          ],
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
        delete: {
          summary: "Deleta um usuário pelo ID (admin)",
          description: "O administrador deleta qualquer usuário passando o ID",
          operationId: "deleteUserByIdAdmin",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID do usuário a ser deletado",
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
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/TokenResponse",
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
      "/touristAttraction/all": {
        get: {
          summary: "Busca todos os pontos turísticos (admin)",
          description:
            "Retorna uma lista de todos os pontos turísticos cadastrados no sistema, incluindo informações sobre a imagem de cada atração, se disponível.",
          operationId: "getAttractions",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description:
                "Lista de atrações turísticas retornada com sucesso.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/TouristAttraction",
                    },
                  },
                  example: [
                    {
                      name: "Ponto turístico A",
                      address: "Rua A, nº 123",
                      openingHours: "09:00 - 18:00",
                      description: "Descrição do Ponto Turístico A",
                      image: "/image/ponto_turistico_a.jpg",
                    },
                    {
                      name: "Ponto turístico B",
                      address: "Av. B, nº 456",
                      openingHours: "10:00 - 17:00",
                      description: "Descrição do Ponto Turístico B",
                      image: "/image/ponto_turistico_b.jpg",
                    },
                  ],
                },
              },
            },
            401: {
              description:
                "Não autorizado. Token de autenticação inválido ou ausente.",
            },
            500: {
              description: "Erro interno do servidor. Contate o administrador.",
            },
          },
        },
      },
      "/touristAttraction/image/{id}": {
        get: {
          summary: "Obtém a imagem de uma atração turística",
          description:
            "Retorna a imagem correspondente ao ID da atração turística",
          operationId: "getImage",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID da atração turística",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Imagem encontrada e retornada com sucesso",
              content: {
                "image/jpeg": {
                  schema: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
            401: {
              description: "Imagem não encontrada",
            },
            500: {
              description: "Erro interno do servidor. Contate o administrador.",
            },
          },
        },
      },
      "/touristAttraction/{id}": {
        delete: {
          summary: "Deleta uma atração turística",
          description:
            "Remove a atração turística correspondente ao ID fornecido",
          operationId: "deleteTouristAttraction",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID da atração turística",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            204: {
              description: "Atração turística deletada com sucesso",
            },
            404: {
              description: "Atração turística não encontrada",
            },
            500: {
              description: "Erro interno do servidor. Contate o administrador.",
            },
          },
        },
      },
      "/touristAttraction/create": {
        post: {
          summary: "Cria um ponto turístico (admin)",
          description: "Realiza a criação de um ponto turístico",
          operationId: "addAttraction",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Ponto turístico X",
                    },
                    address: {
                      type: "string",
                      example: "Rua Exemplo, n 001",
                    },
                    openingHours: {
                      type: "string",
                      example: "Seg a sex -> 09hrs - 18hrs",
                    },
                    description: {
                      type: "string",
                      example:
                        "Esta é uma longa descrição exemplo de uma atração turística",
                    },
                    image: {
                      type: "string",
                      format: "binary",
                      description: "Arquivo de imagem (JPEG, PNG, etc.)",
                    },
                  },
                  required: [
                    "name",
                    "address",
                    "openingHours",
                    "description",
                    "image",
                  ],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Atração Turística registrada com sucesso",
            },
            400: {
              description: "Campos obrigatórios em falta",
            },
          },
        },
      },
      "/touristAttraction/{id}/": {
        patch: {
          summary: "Atualiza um ponto turístico (admin)",
          description:
            "Realiza uma atualização em um ponto turístico definido por ID",
          operationId: "updateAttraction",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              description: "ID da atração turística a ser alterada",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Ponto turístico X",
                    },
                    address: {
                      type: "string",
                      example: "Rua Exemplo, n 001",
                    },
                    openingHours: {
                      type: "string",
                      example: "Seg a sex -> 09hrs - 18hrs",
                    },
                    description: {
                      type: "string",
                      example:
                        "Esta é uma longa descrição exemplo de uma atração turística",
                    },
                    image: {
                      type: "string",
                      format: "binary",
                    },
                  },
                  required: [],
                },
                encoding: {
                  image: {
                    contentType: "image/png, image/jpeg",
                  },
                },
              },
            },
          },
          responses: {
            204: {
              description: "Atração Turística atualizada com sucesso",
            },
            404: {
              description: "Atração Turística não encontrada",
            },
            400: {
              description: "Campos obrigatórios em falta",
            },
          },
        },
      },
      delete: {
        summary: "remove um ponto turístico (admin)",
        description: "Realiza a remoção de um ponto turístico definido por ID",
        operationId: "deleteAttraction",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID do ponto turístico a ser removido",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Atração Turística removida com sucesso",
          },
          404: {
            description: "Atração Turística não encontrada",
          },
        },
      },
      "/reviews/{TouristAttractionId}": {
        post: {
          summary: "Cria uma nova avaliação",
          description:
            "Cria uma nova avaliação para uma atração turística específica",
          operationId: "createReview",
          parameters: [
            {
              name: "TouristAttractionId",
              in: "path",
              required: true,
              description: "ID da atração turística",
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    rating: {
                      type: "number",
                      description: "Classificação da atração turística",
                      minimum: 1,
                      maximum: 5,
                    },
                  },
                  required: ["rating"],
                },
                examples: {
                  review: {
                    summary: "Exemplo de avaliação",
                    value: {
                      rating: 4,
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Avaliação criada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Review",
                  },
                },
              },
            },
            404: {
              description: "Atração turística não encontrada.",
            },
            400: {
              description: "Dados inválidos",
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      // "/reviews/tourist-attraction/{TouristAttractionId}": {
      //   get: {
      //     summary: "Obtém avaliações por atração turística",
      //     description: "Obtém todas as avaliações para uma atração turística específica",
      //     operationId: "getReviewsByTouristAttractionId",
      //     parameters: [
      //       {
      //         name: "TouristAttractionId",
      //         in: "path",
      //         required: true,
      //         description: "ID da atração turística",
      //         schema: {
      //           type: "string",
      //         },
      //       },
      //     ],
      //     responses: {
      //       200: {
      //         description: "Lista de avaliações",
      //         content: {
      //           "application/json": {
      //             schema: {
      //               type: "array",
      //               items: {
      //                 $ref: "#/components/schemas/Review",
      //               },
      //             },
      //           },
      //         },
      //       },
      //       404: {
      //         description: "Avaliações não encontradas",
      //       },
      //     },
      //   },
      // },
      "/reviews/user": {
        get: {
          summary: "Obtém avaliações do usuário",
          description:
            "Obtém todas as avaliações feitas pelo usuário autenticado",
          operationId: "getUserReviews",
          responses: {
            200: {
              description: "Lista de avaliações do usuário",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Review",
                    },
                  },
                },
              },
            },
            401: {
              description: "Token não fornecido ou inválido",
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      "/reviews/{reviewId}": {
        delete: {
          summary: "Deleta uma avaliação",
          description: "Deleta uma avaliação específica pelo ID",
          operationId: "deleteReview",
          parameters: [
            {
              name: "reviewId",
              in: "path",
              required: true,
              description: "ID da avaliação",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            200: {
              description: "Avaliação deletada com sucesso",
            },
            404: {
              description: "Avaliação não encontrada",
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        TouristAttraction: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nome da atração turística",
            },
            address: {
              type: "string",
              description: "Endereço da atração turística",
            },
            openingHours: {
              type: "string",
              description: "Horário de funcionamento da atração turística",
            },
            typeOfAttraction: {
              type: "string",
              description: "Tipo de atração turística",
            },
            description: {
              type: "string",
              description: "Descrição da atração turística",
            },
          },
        },
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
            city: {
              type: "string",
              description: "Cidade do usuário",
            },
            state: {
              type: "string",
              description: "Estado do usuário",
            },
          },
          required: ["name", "email", "password"],
        },
        TokenResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Token de autenticação",
            },
          },
        },
        PasswordChangeResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensagem de confirmação de alteração de senha",
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "ID do usuário que fez a avaliação",
            },
            TouristAttractionId: {
              type: "string",
              description: "ID da atração turística avaliada",
            },
            rating: {
              type: "number",
              description: "Classificação da atração turística",
              minimum: 1,
              maximum: 5,
            },
          },
          required: ["userId", "TouristAttractionId", "rating"],
        },
      },
    },
  },
  apis: ["./src/routes/*.route.js"],
};
