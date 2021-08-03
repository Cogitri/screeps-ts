export default function(): void{
    for (const spawn in Game.spawns) {
        let room =  Game.spawns[spawn].room
        let controller = room.controller
        if (controller) {
            let path = room.findPath(Game.spawns[spawn].pos, controller.pos)
            for (const pathPos in path) {
                let posX = path[pathPos].x;
                let posY = path[pathPos].y;
                room.createConstructionSite(posX,posY,STRUCTURE_ROAD);
            }
            room.memory = {"pathToController" : true};
        }

    }
}
