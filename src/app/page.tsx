import getUserData from "./action/getUserData";

export default async function Home() {
  const userData = await getUserData();
  return (
   <div className="bg-neutral-900 md:mb-0
    w-full h-full rounded-lg overflow-y-auto text-white overflow-hidden">
      <p className="text-white font-semibold p-3"> Hello , welcome
        { userData?.id}
      </p>
    </div>
  );
}
