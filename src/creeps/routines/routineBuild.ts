export default function (creep: Creep): void {
  const pathColor = "#ffff33";

  const walls = creep.room.find(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_WALL
  });
  const ramparts = creep.room.find(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_RAMPART
  });

  const roads = creep.room.find(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_ROAD
  });

  const buildings = creep.room.find(FIND_CONSTRUCTION_SITES, {
    filter: s =>
      s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_ROAD && s.structureType !== STRUCTURE_WALL
  });

  if (buildings.length) {
    build(creep, buildings[0]);
  } else if (roads.length) {
    build(creep, roads[0]);
  } else if (ramparts.length) {
    build(creep, ramparts[0]);
  } else if (walls.length) {
    build(creep, walls[0]);
  }
}
/*

const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

  if (targets.length) {
    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
      creep.memory.lockTask = true;
      creep.say("build");
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: pathColor } });
    }
  }

*/

// Gebäude -> Roads -> Ramparts -> Walls
