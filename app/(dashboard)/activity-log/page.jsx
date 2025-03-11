import React from "react";
import ActivityTable from "@/components/Tables/ActivityTable";
import ActivityData from "@/components/Json/Activity_log";
const headerActivity = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "user_Name",
    header: "User name",
  },
  {
    accessorKey: "activity",
    header: "Activity",
  },
];

export default async function ActivityLog() {
  return (
    <div>
      <ActivityTable header={headerActivity} activity={true} />
    </div>
  );
}
