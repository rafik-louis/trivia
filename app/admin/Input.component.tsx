import { ChangeEventHandler } from "react";

export type InputComponentProps = {
  name: string;
  label: string;
  required?: boolean; // default is true
  type: "number" | "text";
  errors: object & { [key: string]: boolean };
  reference?: React.RefObject<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
};
export default function InputComponent(props: InputComponentProps) {
  return (
    <div>
      <label htmlFor={props.name} className="block text-l font-large ">
        {props.label}
        {`${props.required === false ? "" : "*"}`}
      </label>
      <div className="mt-1">
        <input
          value={props.value}
          ref={props.reference as React.RefObject<HTMLInputElement>}
          id={props.name}
          required={props.required ?? true}
          name={props.name}
          type={props.type}
          autoComplete={props.name}
          onChange={props.onChange}
          aria-invalid={props.errors?.[props.name] ? true : undefined}
          aria-describedby={`${props.name}-error`}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg border-[2px] text-black"
          style={{
            borderColor: props.errors?.[props.name] ? "red" : "gray",
            borderWidth: props.errors?.[props.name] ? "3px" : "2px",
          }}
        />
        {props.errors?.[props.name] ? (
          <div className="pt-1 text-red-700" id={`${props.name}-error`}>
            {props.errors?.[props.name]}
          </div>
        ) : null}
      </div>
    </div>
  );
}
