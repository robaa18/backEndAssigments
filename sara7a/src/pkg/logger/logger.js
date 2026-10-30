class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }
  log(level, message, metaData = {}) {
    let messageObj = {
      level: level,
      message: message,
      time: Date.now(),
      ...metaData,
    };
    console.log(JSON.stringify(messageObj));
  }
  info(message, metaData = {}) {
    this.log("info", message, metaData);
  }
  error(message, metaData = {}) {
    this.log("error", message, metaData);
  }
  debug(message, metaData = {}) {
    this.log("debug", message, metaData);
  }
}
export const logger = new Logger();
