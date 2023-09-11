import Links from "./Links";

export default function Home() {
  return (
    <div className="shadow-lg rounded-lg p-8 bg-white flex flex-col gap-4">
      <p className="font-bold">Navigate to</p>
      <Links />
    </div>
  );
}
