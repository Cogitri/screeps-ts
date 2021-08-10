/**
 * Checks if the creep capacity is full or empty.
 *
 * Releases the locked task when capacity is empty.
 * @param {Creep} creep - The creep.
 * @returns {boolean} - true if capacity is bigger than zero and task is unlocked or capacity is zero and task is locked, false otherwise.
 */
export default function (creep: Creep): boolean {
  if (creep.store.getFreeCapacity() === 0 && !creep.memory.isWorking) {
    creep.memory.isWorking = true;
    creep.memory.announcedTask = false;
    return false;
  }

  if (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.isWorking) {
    creep.memory.isWorking = false;
    creep.memory.announcedTask = false;
  }
  return true;
}
