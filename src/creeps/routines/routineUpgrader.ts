import checkCreepCapacity from "./checkCreepCapacity";
import routineUpgrade from "./routineUpgrade";
import routineWithdraw from "./routineWithdraw";

export default function (creep: Creep): void {
  if (checkCreepCapacity(creep)) {
    routineWithdraw(creep);
  } else {
    routineUpgrade(creep);
  }
}
