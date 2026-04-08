import React from "react";

import CannonVehicle from "./_components/three/cannon-vehicle";

export default function CannonRaycastVehiclePage() {
  const [debug, setDebug] = React.useState<boolean>(false);

  return (
    <div className="size-full">
      <CannonVehicle debug={debug} />
    </div>
  );
}
