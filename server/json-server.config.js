import { defineConfig } from 'json-server'

export default defineConfig({
  file: 'server/db.json',
  port: 3000,
  routes: {
    '/api/issues': '/issues',
    '/api/issues/:id': '/issues/:id',
    '/api/contracts': '/contracts',
    '/api/contracts/:id': '/contracts/:id',
    '/api/comments': '/comments',
    '/api/comments/:id': '/comments/:id',
    '/api/events': '/events',
    '/api/events/:id': '/events/:id',
    '/api/assets': '/assets',
    '/api/assets/:id': '/assets/:id'
  }
})
