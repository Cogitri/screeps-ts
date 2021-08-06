export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

export class Logger {
  private static _logLevel: LogLevel = LogLevel.DEBUG;

  /**
   * Logs message with the DEBUG tag
   *
   * Should be used for information dumps
   *
   * @param message Message to be logged
   */
  public static debug(...message: unknown[]): void {
    if (Logger.logLevel <= 0) {
      const levelString: keyof typeof LogLevel = "DEBUG";
      Logger.composeMsg(levelString, message);
    }
  }

  /**
   * Logs messages with the INFO tag
   *
   * Should be used for valuable information
   *
   * @param message Message to be logged
   */
  public static info(...message: unknown[]): void {
    if (Logger.logLevel <= 1) {
      const levelString: keyof typeof LogLevel = "INFO";
      Logger.composeMsg(levelString, message);
    }
  }

  /**
   * Logs messages with the WARN tag
   *
   * Should be used for warnings about the game state (e.g. low resources)
   *
   * @param message Message to be logged
   */
  public static warn(...message: unknown[]): void {
    if (Logger.logLevel <= 2) {
      const levelString: keyof typeof LogLevel = "WARN";
      Logger.composeMsg(levelString, message);
    }
  }

  /**
   * Logs messages with the ERROR tag
   *
   * Should be used for errors about the game state (e.g. critical routine doesn't work)
   *
   * @param message Message to be logged
   */
  public static error(...message: unknown[]): void {
    if (Logger.logLevel <= 3) {
      const levelString: keyof typeof LogLevel = "ERROR";
      Logger.composeMsg(levelString, message);
    }
  }

  // Helper function
  private static composeMsg(level: keyof typeof LogLevel, ...message: unknown[]) {
    // We obv need console.log here
    // eslint-disable-next-line no-console
    console.log(`[${level}]: ${message.toString()}`);
  }

  public static get logLevel(): LogLevel {
    return this._logLevel;
  }

  /**
   * Set the log level to be used
   */
  public static set logLevel(newLogLevel: LogLevel) {
    this._logLevel = newLogLevel;
  }
}
