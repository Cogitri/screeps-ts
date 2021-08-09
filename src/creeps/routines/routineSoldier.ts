import { movePath } from "utils/vizPath";
import routineTransporter from "./routineTransporter";

export default function (creep: Creep): void {
  const pathColor = "#ff3333";

  if (creep.memory.isWorking && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.isWorking = false;
  }

  // Find closest enemy alive
  // ! Can't find whether or not `FIND_HOSTILE_CREEPS` returns hostile PowerCreeps aswell
  const enemy: AnyCreep | null = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: c => c.hits > 0 });

  // Return to fallback and go harvest when there are no enemies or the enemy is dead
  if (!enemy) {
    // TODO: Refer to harvesting routine or return energy to base
    if (!creep.memory.isWorking) {
      routineTransporter(creep);
    }
    return;
  }

  if (creep.attack(enemy) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("⚔️ attack");
      creep.memory.announcedTask = true;
    }
    movePath(creep, enemy, pathColor);
    creep.memory.target = enemy;
  }
}
