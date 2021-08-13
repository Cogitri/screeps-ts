import pickupEnergy from "./pickupEnergy";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";
import shouldCreepRefill from "./shouldCreepRefill";

/**
 * Default routine for upgrader role. Continously transfers energy into room controller to progress and avoid downgrading.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (shouldCreepRefill(creep)) {
    if (!pickupEnergy(creep)) {
      routineWithdraw(creep);
    }
  } else {
    routineUpgrade(creep);
  }
}
