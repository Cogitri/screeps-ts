/* eslint-disable @typescript-eslint/no-namespace */
import { CreepRoles, Routines } from "utils/globalConsts";
import { LogLevel, Logger } from "utils/logger";
import {
  changeBodyParts,
  changeCreepCount,
  createPath,
  deleteFlags,
  emojiLegend,
  findCreep,
  help,
  logLevel,
  printAuthors,
  showRole,
  statistics,
  toggleDashboards,
  togglePathViz,
  toggleTextViz
} from "./utils/commands";
import gameLoop, { init } from "core/gameLoop";
import { ErrorMapper } from "utils/ErrorMapper";
import { mapToObject } from "utils/mapHelper";
declare global {
  /**
   * Global Memory Interface
   *
   * pathToController: Boolean to check, if Roads to Controller have been deployed
   *
   * logLevel: Saves the current LogLevel over muliple ticks
   *
   * creepCount: Array that saves the amount of creeps that should be spawned for each role
   */
  interface Memory {
    pathToController: boolean;
    logLevel: LogLevel;
    creepCount: { [k: string]: number };
    pathToSources: { [k: string]: boolean };
    roleBodyParts: { [k: string]: BodyPartConstant[] };
    blockedSourcePositions: { [key: string]: Creep | null };
    spawnQueue: CreepRoles[];
    creepsInSpawnQueue: { [k: string]: number };
    flagCount: { [k: string]: number };
  }
  /**
   *  Creep Memory Interface
   *
   * role: The Creep's role
   *
   * room: Creep's current room
   *
   * target: Saves the current Creep's target across multiple ticks
   */
  interface CreepMemory {
    role: CreepRoles;
    room: string;
    isWorking: boolean;
    target?: Structure | Source | Mineral | Creep | null;
    currentTask: Routines;
    targetRoomPosition?: RoomPosition;
    designatedEnergySourcePosition?: RoomPosition;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      textViz: boolean;
      pathViz: boolean;
      dashboards: boolean;
      toggleDashboards: () => string;
      toggleTextViz: () => string;
      togglePathViz: () => string;
      findRole: (role: string) => string;
      help: () => string;
      logLevel: (l: keyof typeof LogLevel) => void;
      sayHello: (name: string) => string;
      changeCreepCount: (role: string, count: number) => string;
      changeBodyparts: (role: string, bodyparts: BodyPartConstant[]) => string;
      emojiLegend: (roomName: string) => string;
      createPath: (name: string, x1: number, y1: number, x2: number, y2: number) => string;
      statistics: (name: string) => string;
      printAuthors: () => string;
      deleteFlags: () => string;
    }
  }
}

global.textViz = true;
global.pathViz = true;
global.dashboards = true;

const initBlockedSourcePositions = new Map<string, Creep | null>();
Memory.blockedSourcePositions = mapToObject(initBlockedSourcePositions);

const initCreepsInSpawnQueue = new Map<CreepRoles, number>();
Memory.creepsInSpawnQueue = mapToObject(initCreepsInSpawnQueue);
/**
 * The loop that gets run on game start.
 *
 * Declares global functions and deletes memory of missing creeps. Calls custom gameLoop()
 */
export const loop = ErrorMapper.wrapLoop(() => {
  global.help = help;
  global.logLevel = logLevel;
  global.findRole = showRole;
  global.sayHello = findCreep;
  global.toggleTextViz = toggleTextViz;
  global.togglePathViz = togglePathViz;
  global.toggleDashboards = toggleDashboards;
  global.changeCreepCount = changeCreepCount;
  global.changeBodyparts = changeBodyParts;
  global.createPath = createPath;
  global.emojiLegend = emojiLegend;
  global.statistics = statistics;
  global.printAuthors = printAuthors;
  global.deleteFlags = deleteFlags;

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      Logger.info(`The ${Memory.creeps[name].role} named  ${name} died`);
      //  ${Game.creeps[name].memory.role}
      delete Memory.creeps[name];
    }
  }
  gameLoop();
});

init();
