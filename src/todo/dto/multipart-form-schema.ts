export default {
  type: 'object',
  required: ['picture', 'data'],
  properties: {
    picture: {
      type: 'string',
      format: 'binary',
    },
    data: {
      type: 'object',
      required: ['name', 'date'],
      properties: {
        name: {
          type: 'string',
        },
        date: {
          type: 'string',
          format: 'date',
        },
        tasks: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'status'],
            properties: {
              name: {
                type: 'string',
              },
              status: {
                type: 'string',
                enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
              },
            },
          },
        },
      },
    },
  },
};
