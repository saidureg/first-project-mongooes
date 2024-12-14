/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

main().catch((err) => console.log(err));

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}

process.on('unhandledRejection', () => {
  console.log('Shutting down the server due to unhandled promise rejection');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Shutting down the server due to uncaught exception');

  process.exit(1);
});
