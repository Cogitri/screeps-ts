import { LogLevel, Logger } from "./logger";

function setupLogger() {
  Logger.logLevel = LogLevel.NONE;
}

setupLogger();
