import { HomeClient } from "@/components/home-client";
import { getLeetCodeStats, getCodeforcesStats, getGFGStats } from "@/lib/coding-services";

export const revalidate = 3600; 

export default async function Home() {
  
  const [leetCode, codeforces, gfg] = await Promise.all([
    getLeetCodeStats("aryasuraj351"),
    getCodeforcesStats("aryasuraj351"),
    getGFGStats("aryasuryv2d")
  ]);

  return (
    <HomeClient 
      initialStats={{
        leetCode,
        codeforces,
        gfg
      }} 
    />
  );
}
