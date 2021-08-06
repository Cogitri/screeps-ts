import { LogLevel, Logger } from "./logger";

export function showRole(role: string): string {
  let found = 0;
  for (const i in Memory.creeps) {
    if (Memory.creeps[i].role === role.toLowerCase()) {
      Game.creeps[i].say("👋");
      ++found;
    }
  }
  if (found === 0) {
    return `No creep of role ${role} found`;
  } else {
    return `${found} creep(s) waved at you!`;
  }
}

export function logLevel(ls: keyof typeof LogLevel): string {
  if (Object.values(LogLevel).some(ll => ll === ls.toUpperCase())) {
    const l: LogLevel = LogLevel[ls.toString().toUpperCase() as keyof typeof LogLevel];
    Logger.logLevel = l;
    Memory.logLevel = l;
    return `Log level now set to ${LogLevel[Logger.logLevel]}`;
  } else {
    let logLevelArr = "";
    Object.keys(LogLevel)
      .filter(k => isNaN(Number(k)))
      .forEach(l => {
        logLevelArr += `${l}, `;
      });
    logLevelArr = logLevelArr.substring(0, logLevelArr.length - 2);
    return `Unknown log level entered, available log levels are: ${logLevelArr}`;
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function findCreep(name: string): string {
  const emojis = ["👋", "✌️", "✋", "🤙", "🙋‍♂️"];

  for (const creepName in Game.creeps) {
    if (creepName === name) {
      Game.creeps[name].say(emojis[Math.floor(Math.random() * (4 + 1))]);
      return "Der gesuchte Screep wurde gefunden.";
    }
  }
  return "Der gesuchte Screep wurde nicht gefunden.";
}
