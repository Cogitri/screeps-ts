/**
 * Checks if the creep should refill its energy storage.
 *
 * Releases the locked task when working and the capacity is empty.
 * @param {Creep} creep - The creep.
 * @returns {boolean} - Returnes true if the Capacity is Empty. Returnes false if the Creep is Full or has a bit energy left.
 */
export default function (creep: Creep): boolean {
  const isWorking = creep.memory.isWorking;
  const usedCapacity = creep.store[RESOURCE_ENERGY];
  if (!isWorking && usedCapacity === creep.store.getCapacity()) {
    creep.memory.isWorking = true;
    return false;
  } else if (isWorking && usedCapacity === creep.store.getCapacity()) {
    return false;
  } else if (!isWorking && usedCapacity === 0) {
    return true;
  } else if (isWorking && usedCapacity === 0) {
    creep.memory.isWorking = false;
    return true;
  } else if (usedCapacity > 0 && usedCapacity < creep.store.getCapacity()) {
    creep.memory.isWorking = true;
    return false;
  }
  return false;
}
