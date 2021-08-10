import { LogLevel, Logger } from "./logger";

import { CreepRoles } from "./globalConsts";
import { mapToObject } from "./mapHelper";

/**
 * Searches creeps of a given role. If found the creeps will print out an emoji.
 * @param role string - The role that is searched.
 * @returns string - Console output whether the command found creeps or not.
 */
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
          changeCreepCount(string, number): changes the max amount of concurrent creeps of the given type (e.g. 'harvester', 5 => max amount of 5 concurrent harvesters)
          changeBodyParts(string, [Bodyparts]): changes the bodyparts of the given role(e.g 'harvester', ['MOVE','MOVE','CARRY'] => harvester will now spawn with 2 Move and 1 Carry Bodypart)`;
}

/**
 * Changes the log level and determines what should be printed out to console.
 * @param ls string - Desired log level. Accepts 'DEBUG', 'INFO', 'WARN', 'ERROR'.
 * @returns string - Consoloe output whether the command was successful or not.
 */
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

/**
 * Searches for a certain creep. If found the creep reacts with one of five emojis.
 * @param name string - Name of the creep.
 * @returns string - Consoloe output whether the creep was found or not.
 */
export function findCreep(name: string): string {
  const emojis = ["👋", "✌️", "✋", "🤙", "🙋‍♂️"];

  for (const creepName in Game.creeps) {
    if (creepName === name) {
      Game.creeps[name].say(emojis[Math.floor(Math.random() * (4 + 1))]);
      return "Creep found!";
    }
  }
  return "No creep found!";
}

/**
 * Toggles whether the textual room visuals should be shown or not. Visuals are displayed by default.
 * @returns string - Console output whether the visuals are now enabled or disabled.
 */
export function toggleTextViz(): string {
  if (global.textViz) {
    global.textViz = false;
    return "Disabled all textual room visuals";
  } else {
    global.textViz = true;
    return "Enabled all textual room visuals";
  }
}

/**
 * Toggles whether the path visuals should be shown or not. Visuals are displayed by default.
 * @returns string - Console output whether the visuals are now enabled or disabled.
 */
export function togglePathViz(): string {
  if (global.pathViz) {
    global.pathViz = false;
    return "Disabled all path visuals";
  } else {
    global.pathViz = true;
    return "Enabled all path visuals";
  }
}

/**
 * Adjusts the default amount of creeps that are spawned by a given number.
 * @param role string - Role of creep.
 * @param count number - New amount of creeps.
 * @returns
 */
export function changeCreepCount(role: string, count: number): string {
  if (Object.values<string>(CreepRoles).includes(role)) {
    if (!isNaN(count)) {
      if (count >= 0) {
        const map = new Map(Object.entries(Memory.creepCount));
        map.set(role, count);

        Memory.creepCount = mapToObject(map);
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

/**
 * Prints out information about the Project team.
 */
export function printAuthors(): string {
  return `Screeps AEM Project developed by Team 8\n
    SM: Rasmus Thomsen, PO: Thorben Rolf, Developers: Dennis Schuetz, Janis Ciemnyjewski, Katharina Sprotte, Lara Laskowsky, Mattis Kunstmann, Mika Schrader, Paul Voss, Tim Brueggemann`;
}

export function changeBodyParts(role: string, bodyparts: BodyPartConstant[]): string {
  if (Object.values<string>(CreepRoles).includes(role)) {
    let validBodyparts = true;
    bodyparts.forEach(bp => {
      if (!BODYPARTS_ALL.includes(bp)) {
        validBodyparts = false;
        return;
      }
    });
    if (!validBodyparts) {
      const map = new Map<string, BodyPartConstant[]>(Object.entries(Memory.roleBodyParts));
      map.set(role, bodyparts);
      Memory.roleBodyParts = mapToObject(map);
      return `New Bodypart Configeration set for role ${role} `;
    } else {
      return "Please only enter valid Bodyparts";
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
