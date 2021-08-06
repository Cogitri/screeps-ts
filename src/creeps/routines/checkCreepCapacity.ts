/**
 * * Checks if the creep capacity is full or empty
 *
 * Releases the locked task when capacity is empty
 *
 * @param creep
 * @returns True if there is free capacity
 */
export default function (creep: Creep): boolean {
  if (creep.store.getFreeCapacity() > 0 && !creep.memory.lockTask) {
    return true;
  }

  if (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.lockTask) {
    creep.memory.lockTask = false;
    return true;
  }
  return false;
}
