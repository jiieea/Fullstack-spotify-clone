import getUserData from "./action/getUserData";

export default async function Home() {
  const userData = await getUserData();
  
  return (
   <div className="bg-neutral-900 md:mb-0 2xl:h-[90vh]  h-[85vh]
 rounded-lg overflow-y-auto text-white overflow-hidden">
      <p className="text-white font-semibold p-3"> Hello , welcome  
{
userData?.full_name ? userData.full_name : userData?.id
}
      </p>
    </div>
  );
}
