/* eslint-disable @typescript-eslint/no-namespace */
import { CreepRoles, Routines } from "utils/globalConsts";
import { LogLevel, Logger } from "utils/logger";
import {
  changeBodyParts,
  changeCreepCount,
  emojiLegend,
  findCreep,
  help,
  logLevel,
  showRole,
  togglePathViz,
  toggleTextViz
} from "./utils/commands";
import gameLoop, { init } from "core/gameLoop";
import { ErrorMapper } from "utils/ErrorMapper";

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
    announcedTask: boolean;
    target: Structure | Source | Mineral | Creep | null;
    currentTask: Routines;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      textViz: boolean;
      pathViz: boolean;
      toggleTextViz: () => string;
      togglePathViz: () => string;
      findRole: (role: string) => string;
      help: () => string;
      logLevel: (l: keyof typeof LogLevel) => void;
      sayHello: (name: string) => string;
      changeCreepCount: (role: string, count: number) => string;
      changeBodyparts: (role: string, bodyparts: BodyPartConstant[]) => string;
      emojiLegend: (roomName: string) => string;
    }
  }
}
global.textViz = true;
global.pathViz = true;

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
  global.changeCreepCount = changeCreepCount;
  global.changeBodyparts = changeBodyParts;
  global.emojiLegend = emojiLegend;

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
