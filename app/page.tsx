import { HomeClient } from "@/components/home-client";
import { getLeetCodeStats, getCodeforcesStats } from "@/lib/coding-services";

export const revalidate = 3600; 

export default async function Home() {
  
  const [leetCode, codeforces] = await Promise.all([
    getLeetCodeStats("aryasuraj351"),
    getCodeforcesStats("aryasuraj351")
  ]);

  return (
    <HomeClient 
      initialStats={{
        leetCode,
        codeforces
      }} 
    />
  );
}
