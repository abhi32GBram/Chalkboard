import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 text-red-800">
      Chalkboard
      <h1>This Screen is for Authenticated Users Only</h1>
      <UserButton />
    </div>
  );
}
