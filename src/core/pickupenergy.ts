export default function(): void{
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES)
    }
}
