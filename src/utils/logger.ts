enum LogLevel {
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
      Logger.composeMsg(LogLevel.DEBUG, message);
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
      Logger.composeMsg(LogLevel.INFO, message);
    }
  }

  public static warn(...message: unknown[]): void {
    if (Logger.logLevel <= 2) {
      Logger.composeMsg(LogLevel.WARN, message);
    }
  }

  public static error(...message: unknown[]): void {
    if (Logger.logLevel <= 3) {
      Logger.composeMsg(LogLevel.ERROR, message);
    }
  }

  private static composeMsg(level: LogLevel, ...message: unknown[]) {
    console.log(`[${level}]: ${message.toString()} `);
  }

  public static get logLevel(): any {
    return this._logLevel.toString();
  }

  public static set logLevel(newLogLevel: LogLevel) {
    this._logLevel = newLogLevel;
    console.log("LOG LEVEL NOW SET TO ${this._logLevel}");
  }
}
