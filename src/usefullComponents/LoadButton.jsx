import { memo } from "react";

function LoadButton({ title = "Load More Page", clickHandle, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={clickHandle}
      className="border rounded border-zinc-400  p-3 text-zinc-400 my-4 hover:bg-zinc-600 hover:text-white transition-all hover:border-zinc-600 font-medium"
    >
      {title}
    </button>
  );
}

export default memo(LoadButton);
