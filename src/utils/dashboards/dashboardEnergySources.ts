import { Bar, Dashboard, Grid, Rectangle, Widget } from "screeps-viz";

/**
 * Creates a dashboard that displays the current amount of energy of the sources.
 *
 * @param spawn Get the room associated to this spawn.
 */
export function visualizeDashboardEnergySources(spawn: string): void {
  const dataTest: Widget[] = [];
  const sources = Game.spawns[spawn].room.find(FIND_SOURCES);

  if (sources) {
    sources.forEach(element => {
      const barWidget = Bar(() => ({
        data: { value: element.energy, maxValue: element.energyCapacity },
        config: {
          label: `${element.pos.x}, ${element.pos.y}`,
          style: {
            fill: "rgba(255,255,0,0.3)",
            stroke: "rgba(255,255,0,0.7"
          }
        }
      }));
      dataTest.push(barWidget);
    });
  }

  Dashboard({
    widgets: [
      {
        pos: {
          x: 0.5,
          y: 10
        },
        width: 3.127 * dataTest.length,
        height: 7.5,
        widget: Rectangle({
          data: Grid({
            data: dataTest,
            config: { columns: dataTest.length, rows: 1 }
          })
        })
      }
    ]
  });
}
