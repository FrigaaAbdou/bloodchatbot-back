# Backend Environment Guide

This Express server uses environment variables for sensitive configuration. The default `.env` file should **not** be committed. Instead, create a local `.env` for development and configure production secrets via your hosting provider.

## Required Variables

| Variable | Description | Example |
| --- | --- | --- |
| `OPENAI_API_KEY` | API key for the OpenAI client. | `sk-...` |
| `PORT` (optional) | Port on which the Express server listens. Defaults to `3000`. | `8080` |

## Sample `.env`

```bash
OPENAI_API_KEY="sk-your-key-here"
PORT=3000
```

## Sensitive Files to Ignore

Ensure the following entries are present in your backend repository’s `.gitignore`:

- `.env`
- `.env.local`
- `.env.*`
- `*.env`

These files must never be committed because they contain API keys and configuration secrets.

## Deployment Recommendations

1. Set `OPENAI_API_KEY` and `PORT` using environment management tooling (Heroku, Render, Fly.io, Docker secrets, etc.).
2. Rotate the OpenAI key regularly and restrict access according to best practices.
3. Avoid logging the raw API key or storing it in client-side code.

## Verifying Configuration

To confirm environment variables are loaded correctly:

```bash
# from the server directory
npm install
npm start

# or with a specific env file
OPENAI_API_KEY=... PORT=4000 npm start
```

If the server reports “AI error” or cannot connect to OpenAI, double-check that the key is present and valid.
