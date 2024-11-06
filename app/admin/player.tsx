export default function Player(props: {
  name: string;
  id: number;
  score: number;
}) {
  return (
    <>
      <div className="font-xl col-start-1 text-center text-left border-x-[1px] overflow-scroll">
        {props.id}
      </div>
      <div className="font-xl col-start-2 text-center text-left border-x-[1px] overflow-scroll">
        {props.name}
      </div>
      <div className="font-xl col-start-3 text-center  text-left border-x-[1px] overflow-scroll">
        {props.score}
      </div>
    </>
  );
}
