export default {
  type: 'object',
  properties: {
    bucket: { type: 'string' },
    key: { type: 'string' },
  },
  required: ['bucket', 'key'],
} as const;