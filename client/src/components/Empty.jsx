import Image from "next/image";
import React from "react";

function Empty() {
  return(
    <div className="border-conversation-border border-2 w-full bg-panel-header-background flex flex-clol h-[100vh] border-b-icon-green items-center justify-center">
      <Image src='/whatsapp.gif' alt='whatsapp' height={300} width={300} />
    </div>
  );
}

export default Empty;
