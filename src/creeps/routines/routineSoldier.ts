import { movePath } from "utils/vizPath";
import routineTransporter from "./routineTransporter";

export default function (creep: Creep): void {
  const pathColor = "#ff3333";

  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
  }

  // Find closest enemy alive
  // ! Can't find whether or not `FIND_HOSTILE_CREEPS` returns hostile PowerCreeps aswell
  const enemy: AnyCreep | null = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: c => c.hits > 0 });

  // Return to fallback and go harvest when there are no enemies or the enemy is dead
  if (!enemy) {
    // TODO: Refer to harvesting routine or return energy to base
    if (!creep.memory.working) {
      routineTransporter(creep);
    }
    return;
  }

  if (creep.attack(enemy) === ERR_NOT_IN_RANGE && shouldFightEnemy(enemy, creep)) {
    creep.say("⚔️ attack");
    movePath(creep, enemy, pathColor);
    creep.memory.target = enemy;
  }
}

/**
 * Helper function to determine whether we should fight an enemy or not
 *
 * @param enemy The enemy to be fought with
 *
 * @returns True if we should fight the enemy, false if we shouldn't
 */
function shouldFightEnemy(enemy: AnyCreep, us: AnyCreep): boolean {
  // Don't fight powercreeps unless it's neccessary as we can't determine their body parts
  if (enemy instanceof PowerCreep) {
    return false;
  }

  try {
    us = us as Creep;
  } catch (e) {
    return true;
  }

  if (
    enemy.body.filter(p => p.type === "attack" || p.type === "tough").length >
      us.body.filter(p => p.type === "attack" || p.type === "tough").length &&
    enemy.hits > us.hits
  ) {
    return false;
  }
}
