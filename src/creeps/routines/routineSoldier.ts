import { Logger } from "utils/logger";
import { PathColors } from "utils/globalConsts";
import { movePath } from "utils/vizPath";
import routineTransporter from "./routineTransporter";
const BODY_PART_THRESHOLD = 5;
const HP_THRESHOLD = 200;

export default function (creep: Creep): void {
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
  }

  // Find closest enemy alive
  // ! Can't find whether or not `FIND_HOSTILE_CREEPS` returns hostile PowerCreeps aswell
  const enemy: AnyCreep | null = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: c => c.hits > 0 });

  // double negation is needed as otherwise TS doesn't allow to assing `null` as a boolean
  creep.memory.working = !!enemy;

  // Return to fallback and go harvest when there are no enemies or the enemy is dead
  if (!enemy) {
    routineTransporter(creep);
    return;
  }

  if (creep.attack(enemy) === ERR_NOT_IN_RANGE && shouldFightEnemy(enemy, creep)) {
    creep.say("⚔️ attack");
    movePath(creep, enemy, PathColors.PATHCOLOR_SOLDIER);
    creep.memory.target = enemy;
    if (creep.memory.currentTask !== "attack") {
      Logger.info(`${creep.name} switched to fighting routine`);
      creep.memory.currentTask = "attack";
    }
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
  // Hack to determine whether the enemy is a PowerCreep since we can't use instanceof
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!(enemy as any).body) {
    // Give us a little advantage as PowerCreeps are probably stronger
    if (us.hits - enemy.hits > HP_THRESHOLD) {
      return true;
    }
    return false;
  }

  // We need the body object to determince calcs, so a PowerCreep Soldier has less checks
  const enemyBodyCare = (enemy as Creep).body.filter(p => p.type === "attack" || p.type === "tough");
  const usBodyCare = (us as Creep).body.filter(p => p.type === "attack" || p.type === "tough");

  if (enemyBodyCare.length > usBodyCare.length && enemy.hits > us.hits) {
    return false;
  }

  if (enemyBodyCare.length - usBodyCare.length > BODY_PART_THRESHOLD) {
    return false;
  }

  if (enemy.hits - us.hits > HP_THRESHOLD) {
    return false;
  }

  return true;
}
