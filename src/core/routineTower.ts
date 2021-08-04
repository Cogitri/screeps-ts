export default function (tower: StructureTower): void {
  const enemy: AnyCreep | null = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: c => c.hits > 0 });
  const woundedCreep = tower.room.find(FIND_MY_CREEPS, { filter: c => c.hits < c.hitsMax });
  if (enemy) {
    tower.attack(enemy);
  } else if (woundedCreep.length) {
    console.log(woundedCreep[0]);
    tower.heal(woundedCreep[0]);
  } else {
    const structure = tower.room.find(FIND_STRUCTURES, {
      filter: s =>
        (s.structureType === STRUCTURE_WALL && s.hits < 0.1 * s.hitsMax) ||
        (s.structureType !== STRUCTURE_WALL && s.hits < 0.69 * s.hitsMax)
    });
    if (structure) {
      tower.repair(structure[0]);
    }
  }
}
