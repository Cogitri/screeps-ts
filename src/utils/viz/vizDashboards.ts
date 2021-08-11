import { visualizeDashboardCreepsRoles } from "utils/dashboards/dashboardCreepRoles";
import { visualizeDashboardEnergySources } from "utils/dashboards/dashboardEnergySources";
import { visualizeDashboardLegend } from "utils/dashboards/dashboardLegend";

export function visualizeDashboards(spawn: string): void {
  if (global.dashboards) {
    visualizeDashboardCreepsRoles();
    visualizeDashboardLegend();
    visualizeDashboardEnergySources(spawn);
  }
}
