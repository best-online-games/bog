FROM node:22-alpine

WORKDIR /app
COPY oauth.mjs .

ENV FIGMOL_OAUTH_PORT=9093
EXPOSE 9093

USER node
CMD [ "node", "oauth.mjs" ]
