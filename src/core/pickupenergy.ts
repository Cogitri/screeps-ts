export default function (): void {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
      filter: r => r.resourceType === RESOURCE_ENERGY
    });
    const ruin = creep.room.find(FIND_RUINS);
    const tombstones = creep.room.find(FIND_TOMBSTONES);
    console.log("pickupEnergy läuft");

    if (droppedEnergy.length) {
      creep.moveTo(droppedEnergy[0]);
      const pickupDropped = creep.pickup(droppedEnergy[0]);
      console.log(pickupDropped);
    }

    // var lootRuin = creep.store[RESOURCE_ENERGY];
    const lootRuin = creep.withdraw(ruin[0], RESOURCE_ENERGY);
    if (ruin.length) {
      console.log();
      console.log("ruin");
      // console.log(creep.store[RESOURCE_ENERGY]);
    }
    if (lootRuin === ERR_NOT_IN_RANGE) {
      creep.moveTo(ruin[0]);
    }

    if (tombstones.length) {
      creep.moveTo(tombstones[0]);
      const lootTombstone = creep.withdraw(tombstones[0], RESOURCE_ENERGY);
      console.log(lootTombstone);
      console.log(creep.withdraw(tombstones[0], RESOURCE_ENERGY));
    }
  }
}
