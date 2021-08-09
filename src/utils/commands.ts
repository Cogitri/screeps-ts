import { LogLevel, Logger } from "./logger";
import { CreepRoles } from "./globalConsts";

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

/**
 * Lists all implemented commands. Besides being a command itself, gets called on script start
 * @returns string that lists all implemented commands
 */
export function help(): string {
  return `The following commands are currently provided: \n
          help(): shows a list of all commands\n
          logLevel(string): adjusts the log level. Provided argument must be one of ('debug', 'info', 'warn', 'error')\n
          findRole(string): finds creeps of provided role. e.g. 'harvester'\n
          sayHello(string): finds the creep by provided name\n
          changeCreepCount(string, number): changes the max amount of concurrent creeps of the given type (e.g. 'harvester', 5 => max amount of 5 concurrent harvesters)`;
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

// enable text visuals
export function toggleTextViz(): string {
  if (global.textViz) {
    global.textViz = false;
    return "Disabled all textual room visuals";
  } else {
    global.textViz = true;
    return "Enabled all textual room visuals";
  }
}

// enable path visuals
export function togglePathViz(): string {
  if (global.pathViz) {
    global.pathViz = false;
    return "Disabled all path visuals";
  } else {
    global.pathViz = true;
    return "Enabled all path visuals";
  }
}
export function changeCreepCount(role: string, count: number): string {
  if (Object.values<string>(CreepRoles).includes(role)) {
    if (!isNaN(count)) {
      if (count >= 0) {
        const map = new Map(Object.entries(Memory.creepCount));
        map.set(role, count);

        Memory.creepCount = Object.fromEntries(map);
        return `Creep count for role ${role} set to ${count}`;
      } else {
        return `Please enter a positive number`;
      }
    } else {
      return "Please enter a valid number";
    }
  } else {
    let roleArray = "";
    Object.keys(CreepRoles)
      .filter(k => isNaN(Number(k)))
      .forEach(l => {
        roleArray += `${l}, `;
      });
    roleArray = roleArray.substring(0, roleArray.length - 2);
    return `Please enter a valid Creep role. The current roles are: ${roleArray} `;
  }
}
