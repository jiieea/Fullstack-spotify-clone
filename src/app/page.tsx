import getUserData from "./action/getUserData";



export default async function Home() {
  const userData = await getUserData();
  return (
   <div className="text-green-500">Hello , Welcome { userData?.id}</div>
  );
}
