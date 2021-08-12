/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { CreepRoles, PathColors, WorkEmoji } from "./globalConsts";
import { LogLevel, Logger } from "./logger";
import { mapToObject } from "./mapHelper";

/**
 * Searches creeps of a given role. If found the creeps will print out an emoji.
 * @param role string - The role that is searched.
 * @returns string - Console output whether the command found creeps or not.
 */
export function showRole(role: string): string {
  const emojis = ["👋", "✌️", "✋", "🤙", "🙋‍♂️"];

  let found = 0;
  for (const i in Memory.creeps) {
    if (Memory.creeps[i].role === role.toLowerCase()) {
      Game.creeps[i].say(emojis[Math.floor(Math.random() * (4 + 1))]);
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
          changeCreepCount(string, number): changes the max amount of concurrent creeps of the given type (e.g. 'harvester', 5 => max amount of 5 concurrent harvesters)\n
          changeBodyparts(string, [Bodyparts]): changes the bodyparts of the given role(e.g 'harvester', ['MOVE','MOVE','CARRY'] => harvester will now spawn with 2 Move and 1 Carry Bodypart)\n
          emojiLegend(string): shows a legend of used emojis on top of the room. Needs the room name as parameter.\n
          toggleTextViz(): Depending on current state enables/disables textual room visuals\n
          togglePathViz(): Depending on current state enables/disables creep path visuals\n
          printAuthors(): Prints out information about the project team \n
          createPath(string, number, number, number, number): create a visual path to build a road/wall. Requires the room name and 2 pairs of x and y coordinates \n
          statistics(string): shows stats of a certain room under your controll\n
          toggleDashboards(): turns the Dashboards on and off\n
          Whenever a command expects a parameter like this => sayHello(string) it means that the provided parameter inside the brackets needs to be in quotes, e.g. sayHello('Bob')`;
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

  const creepName = name.toLowerCase();

  for (const cName in Game.creeps) {
    if (cName === creepName) {
      Game.creeps[creepName].say(emojis[Math.floor(Math.random() * (4 + 1))]);
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
 * Toggles whether the dashboard visuals should be shown or not. Visuals are displayed by default.
 * @returns string - Console output whether the dashboard visuals are now enabled or disabled.
 */
export function toggleDashboards(): string {
  if (global.dashboards) {
    global.dashboards = false;
    return "Disabled all Dashboards";
  } else {
    global.dashboards = true;
    return "Enabled all Dashboards";
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
 * @returns string - Consoloe output whether the command was successful or not.
 */
export function changeCreepCount(role: string, count: number): string {
  const creepRole = role.toLowerCase();
  if (Object.values<string>(CreepRoles).includes(creepRole)) {
    if (!isNaN(count)) {
      if (count >= 0) {
        const map = new Map(Object.entries(Memory.creepCount));
        map.set(creepRole, count);

        Memory.creepCount = mapToObject(map);
        return `Creep count for role ${creepRole} set to ${count}`;
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
 * @returns The information about the Project team
 */
export function printAuthors(): string {
  return `Screeps AEM Project developed by Team 8\n
    SM: Rasmus Thomsen, PO: Thorben Rolf, Developers: Dennis Schuetz, Janis Ciemnyjewski, Katharina Sprotte, Lara Laskowsky, Mattis Kunstmann, Mika Schrader, Paul Voss, Tim Brueggemann`;
}

/**
 * Command to change default bodyparts of given role.
 * @param role Role of the creep.
 * @param bodyparts Array of bodyparts.
 * @returns string - Consoloe output whether the command was successful or not.
 */
export function changeBodyParts(role: string, bodyparts: BodyPartConstant[]): string {
  const creepRole = role.toLowerCase();

  if (Object.values<string>(CreepRoles).includes(creepRole)) {
    let validBodyparts = true;
    bodyparts.forEach(bp => {
      if (!BODYPARTS_ALL.includes(bp)) {
        validBodyparts = false;
        return;
      }
    });
    if (!validBodyparts) {
      const map = new Map<string, BodyPartConstant[]>(Object.entries(Memory.roleBodyParts));
      map.set(creepRole, bodyparts);
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

/**
 * Shows a legend of used emojis on top of the room.
 * @param roomName Name of the {@link https://docs.screeps.com/api/#Room|Room}.
 * @returns Whether the command was successful.
 */
export function emojiLegend(roomName: string): string {
  if (Game.rooms[roomName] !== undefined) {
    if (global.textViz) {
      Game.rooms[roomName.toLocaleUpperCase()].visual.text(
        `${WorkEmoji.EMOJI_BUILD} Build\n
         ${WorkEmoji.EMOJI_REPAIR} Repair\n
         ${WorkEmoji.EMOJI_HARVEST} Harvest\n
         ${WorkEmoji.EMOJI_DELIVER} Deliver\n
         ${WorkEmoji.EMOJI_ATTACK} Attack\n
         ${WorkEmoji.EMOJI_UPGRADE} Upgrade\n
         ${WorkEmoji.EMOJI_WITHDRAW} Withdraw`,
        49,
        1,
        { color: "white", align: "right" }
      );
      return `Legend is shown at the top in room ${roomName}.`;
    } else {
      return "Textual room visuals currently disabled.";
    }
  } else {
    return "Invalid room name.";
  }
}

/**
 * Shows a lined path between two coordinates
 * @param name name of the romm
 * @param x1 x of the first coordinate
 * @param y1 y of the first coordinate
 * @param x2 x of the second coordinate
 * @param y2 y of the second coordinate
 * @returns returns a visual path
 */
export function createPath(name: string, x1: number, y1: number, x2: number, y2: number): string {
  let roomName = name.toUpperCase();

  if (roomName === "SIM") {
    roomName = name.toLowerCase();
  } else if (Game.rooms[roomName] === undefined || Game) {
    let roomArray = "";
    for (const names in Game.rooms) {
      const nameRoom = Game.rooms[names];
      roomArray += `${nameRoom}, `;
    }
    roomArray = roomArray.substring(0, roomArray.length - 2);
    return `Room not found, current list of rooms ${roomArray}`;
  } else {
    const coords = [x1, y1, x2, y2];
    for (const coord of coords) {
      if (coord < 0 || coord > 50) {
        return "Please enter a valid positive number";
      }
    }
  }

  const pos1 = new RoomPosition(x1, y1, roomName);
  const pos2 = new RoomPosition(x2, y2, roomName);

  const path: any = Game.rooms[roomName].findPath(pos1, pos2);
  new RoomVisual(name).poly(path, { stroke: PathColors.PATHCOLOR_PATH, lineStyle: "dashed" });
  return "Path will be visualized";
}

/**
 * Shows the stats of the room.
 * @param name Name of the {@link https://docs.screeps.com/api/#Room|Room}.
 * @returns room stats.
 */
export function statistics(name: string): string {
  let roomName = name.toUpperCase();

  if (roomName === "SIM") {
    roomName = name.toLowerCase();
  } else if (Game.rooms[roomName] === undefined || Game) {
    let roomArray = "";
    for (const names in Game.rooms) {
      const nameRoom = Game.rooms[names];
      roomArray += `${nameRoom}, `;
    }
    roomArray = roomArray.substring(0, roomArray.length - 2);
    return `Room not found, current list of rooms ${roomArray}`;
  }

  const energy = Game.rooms[roomName].energyAvailable;
  const creeps = Game.rooms[roomName].find(FIND_MY_CREEPS);
  const creepsMap = new Map<string, number>([
    [CreepRoles.ROLE_BUILDER, 0],
    [CreepRoles.ROLE_HARVESTER, 0],
    [CreepRoles.ROLE_REPAIRER, 0],
    [CreepRoles.ROLE_TRANSPORTER, 0],
    [CreepRoles.ROLE_UPGRADER, 0]
  ]);

  for (const creep of creeps) {
    if (creep.memory.role === CreepRoles.ROLE_HARVESTER) {
      const tmp = creepsMap.get(CreepRoles.ROLE_HARVESTER);
      if (tmp !== undefined && tmp >= 0) {
        creepsMap.set(CreepRoles.ROLE_HARVESTER, tmp + 1);
      }
    } else if (creep.memory.role === CreepRoles.ROLE_BUILDER) {
      const tmp = creepsMap.get(CreepRoles.ROLE_BUILDER);
      if (tmp !== undefined && tmp >= 0) {
        creepsMap.set(CreepRoles.ROLE_BUILDER, tmp + 1);
      }
    } else if (creep.memory.role === CreepRoles.ROLE_REPAIRER) {
      const tmp = creepsMap.get(CreepRoles.ROLE_REPAIRER);
      if (tmp !== undefined && tmp >= 0) {
        creepsMap.set(CreepRoles.ROLE_REPAIRER, tmp + 1);
      }
    } else if (creep.memory.role === CreepRoles.ROLE_TRANSPORTER) {
      const tmp = creepsMap.get(CreepRoles.ROLE_TRANSPORTER);
      if (tmp !== undefined && tmp >= 0) {
        creepsMap.set(CreepRoles.ROLE_TRANSPORTER, tmp + 1);
      }
    } else {
      const tmp = creepsMap.get(CreepRoles.ROLE_UPGRADER);
      if (tmp !== undefined && tmp >= 0) {
        creepsMap.set(CreepRoles.ROLE_UPGRADER, tmp + 1);
      }
    }
  }

  const controller = Game.rooms[roomName].controller;

  if (!controller) {
    return `\nStats:
            Creeps:
              - Harvester:          ${creepsMap.get(CreepRoles.ROLE_HARVESTER)}
              - Builder:            ${creepsMap.get(CreepRoles.ROLE_BUILDER)}
              - Repairer:           ${creepsMap.get(CreepRoles.ROLE_REPAIRER)}
              - Transporter:        ${creepsMap.get(CreepRoles.ROLE_TRANSPORTER)}
              - Upgrader:           ${creepsMap.get(CreepRoles.ROLE_UPGRADER)}
            Energy Available:       ${energy}
            Controller not found in room ${roomName}`;
  }

  const controllerEXP = controller.progressTotal - controller.progress;
  const controllerLevel = controller.level;

  return `\nStats:
          Creeps:
            - Harvester:          ${creepsMap.get(CreepRoles.ROLE_HARVESTER)}
            - Builder:            ${creepsMap.get(CreepRoles.ROLE_BUILDER)}
            - Repairer:           ${creepsMap.get(CreepRoles.ROLE_REPAIRER)}
            - Transporter:        ${creepsMap.get(CreepRoles.ROLE_TRANSPORTER)}
            - Upgrader:           ${creepsMap.get(CreepRoles.ROLE_UPGRADER)}
          Energy Available:       ${energy}
          Controller Level:       ${controllerLevel}
          Energy for next Level:  ${controllerEXP}`;
}
