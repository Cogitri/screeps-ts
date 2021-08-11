import { Dashboard, Rectangle, Table } from "screeps-viz";
import { WorkAction, WorkEmoji } from "utils/globalConsts";

/**
 * Creates the dashboard for legend for the emojis.
 */
export function visualizeDashboardLegend(): void {
  const tableEmoji = Table({
    data: [
      [WorkEmoji.EMOJI_ATTACK, WorkAction.ACTION_ATTACK],
      [WorkEmoji.EMOJI_BUILD, WorkAction.ACTION_BUILD],
      [WorkEmoji.EMOJI_DELIVER, WorkAction.ACTION_DELIVER],
      [WorkEmoji.EMOJI_HARVEST, WorkAction.ACTION_HARVEST],
      [WorkEmoji.EMOJI_REPAIR, WorkAction.ACTION_REPAIR],
      [WorkEmoji.EMOJI_UPGRADE, WorkAction.ACTION_UPGRADE],
      [WorkEmoji.EMOJI_WITHDRAW, WorkAction.ACTION_WITHDRAW]
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
          data: tableEmoji
        })
      }
    ]
  });
}
