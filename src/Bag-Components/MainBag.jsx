import React, { useState } from "react";
import MiniNav from "./MiniNav";
import Tote from "./Tote-Bags/Tote";

function MainBag() {
  // ------------------------------------------------------------------------
  // Current page component state
  // - Default: Tote bag component
  // - Updated via MiniNav buttons
  // ------------------------------------------------------------------------
  const [page, setPage] = useState(<Tote />);

  return (
    <div data-aos="fade-up"
      data-aos-duration="1000">
      {/* Mini Navigation for switching between bag types */}
      <div>
        <MiniNav page={page} setPage={setPage} />
      </div>

      {/* Render selected page/component */}
      <div>{page}</div>
    </div>
  );
}

export default MainBag;
