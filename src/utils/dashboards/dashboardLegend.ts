import { Dashboard, Rectangle, Table } from "screeps-viz";

/**
 * Creates the dashboard for legend for the emojis.
 */
export function visualizeDashboardLegend(): void {
  const table12 = Table({
    data: [
      ["⚔️", "Attack"],
      ["⚒️", "Build"],
      ["✈️", "Deliver"],
      ["⛏️", "Harvest"],
      ["🛠️", "Repair"],
      ["⚡", "Upgrade"],
      ["📤", "Withdraw"]
    ],
    config: {
      headers: ["Emoji", "Meaning"]
    }
  });

  Dashboard({
    widgets: [
      {
        pos: {
          x: 40,
          y: 1
        },
        width: 8,
        height: 9,
        widget: Rectangle({
          data: table12
        })
      }
    ]
  });
}
