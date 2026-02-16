export const secrets = {
  ACCESS_TOKEN_SECRET:
    process.env.ACCESS_TOKEN_SECRET ??
    "ShEjq3DVPKXclvUUUWKK0KDotfHki2GdUc1m2+chxRVpEzp6ZGMnn4KCu9CsnFTvy6IVrRu3JAH6ZQMo8eewmJozNXfrfNZjaDyhQjpptGwS/Z9kaUFK0QlwgwUWGSxQVbT8WZUciYVLmYy0gfuVuY4PNsOBOw0QFygWEv76x1c=",
  MONGOOSE_CONNECTION_STRING:
    process.env.MONGOOSE_CONNECTION_STRING ??
    "mongodb+srv://prashanith007:d7ZgQoBJ9SUyyyR4@babble.v6omjhz.mongodb.net/?retryWrites=true&w=majority&appName=babble",
  PORT: process.env.PORT ?? 3000,
};
