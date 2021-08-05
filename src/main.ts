/* eslint-disable @typescript-eslint/no-namespace */
import { LogLevel, Logger } from "utils/logger";
import { ErrorMapper } from "utils/ErrorMapper";
import gameLoop from "./core/gameLoop";
import { showRole } from "./utils/commands";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
    pathToController: boolean;
    logLevel: LogLevel;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    lockTask: boolean;
    target: Structure | Source | Mineral | Creep | null;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
      findRole: (role: string) => void;
      logLevel: (l: LogLevel) => void;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  global.logLevel = (l: LogLevel) => {
    Logger.logLevel = l;
    Memory.logLevel = l;
    return `LOG LEVEL NOW SET TO ${Logger.logLevel}`;
  };

  // Automatically delete memory of missing creeps
  global.findRole = showRole;
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  gameLoop();
});
