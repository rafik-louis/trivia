"use client";
import PlayerComponent from "./player";
import { useEffect, useState } from "react";
import { Player, WithValue } from "./types";
import InputComponent from "./Input.component";

export function ViewPlayersComponent({
  searchFunction,
}: {
  searchFunction: (search: string) => Promise<Player[]>;
}) {
  const [data, setData] = useState<Player[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await searchFunction(search);
      setData(data as unknown[] as Player[]);
    })();
  }, [search, searchFunction]);
  return (
    <>
      <div className="max-w-[80%] max-h-[40%] mt-[50px] ml-[10%]">
        <InputComponent
          name="search"
          label="Search:"
          type="text"
          errors={{}}
          value={search}
          required={false}
          onChange={(v) => setSearch((v.currentTarget as WithValue).value)}
        />
      </div>
      <div className="grid grid-cols-3 border-2 mt-[3vh] max-w-[90%] ml-[5%] max-h-[75vh] overflow-scroll">
        <h2 className="col-start-1 text-center border-[1px]"> ID</h2>
        <h2 className="col-start-2 text-center border-[1px]"> Name</h2>
        <h2 className="col-start-3 text-center border-[1px]"> Score</h2>
        {data?.length > 0 &&
          data.map((player) => (
            <PlayerComponent
              key={player.id}
              name={player.name}
              id={player.id}
              score={player.score}
            />
          ))}
      </div>
    </>
  );
}
