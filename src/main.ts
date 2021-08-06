/* eslint-disable @typescript-eslint/no-namespace */
import { findCreep, logLevel, showRole } from "./utils/commands";
import { CreepRoles } from "utils/globalConsts";
import { ErrorMapper } from "utils/ErrorMapper";
import { LogLevel } from "utils/logger";
import gameLoop from "./core/gameLoop";

declare global {
  /**
   * Global Memory Interface
   *
   * pathToController: Boolean to check, if Roads to Controller have been deployed
   *
   * logLevel: Saves the current LogLevel over muliple ticks
   */
  interface Memory {
    pathToController: boolean;
    logLevel: LogLevel;
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
    target: Structure | Source | Mineral | Creep | null;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      findRole: (role: string) => void;
      logLevel: (l: keyof typeof LogLevel) => void;
      sayHello: (name: string) => string;
    }
  }
}

export const loop = ErrorMapper.wrapLoop(() => {
  global.logLevel = logLevel;
  global.findRole = showRole;
  global.sayHello = findCreep;

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  gameLoop();
});
