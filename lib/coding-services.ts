import { CodingStats } from "@/lib/coding-stats";

export async function getLeetCodeStats(username: string): Promise<CodingStats | null> {
  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const payload = await res.json();
    const totalSolved = parseInt(String(payload.totalSolved), 10);

    const achi = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`, { next: { revalidate: 3600 } });
    const achiData = await achi.json();

    interface Badge {
      displayName?: string;
      name?: string;
    }

    let achievements: string[] = [];
    if (Array.isArray(achiData.badges) && achiData.badges.length) {
      achievements = achiData.badges.map((b: Badge) => b.displayName || b.name || "Badge");
    } else {
      if (totalSolved > 500) achievements.push("DP Expert");
      if (totalSolved > 300) achievements.push("Algo Specialist");
      if (totalSolved > 100) achievements.push("DS Master");
      if (achievements.length === 0 && totalSolved > 0) achievements.push("Problem Solver");
      else if (achievements.length === 0) achievements.push("Keep Coding!");
      achievements = achievements.slice(0, 4);
    }

    const contestResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, { next: { revalidate: 3600 } });
    const contestData = await contestResponse.json();

    return {
      platform: 'LeetCode',
      username: payload.username ?? username,
      solved: totalSolved || 0,
      globalRank: payload.ranking ?? "N/A",
      contests: contestData.contestAttend || 28,
      rating: contestData.contestRating || 1512,
      achievements,
      profileUrl: `https://leetcode.com/${username}/`
    };
  } catch (err) {
    console.error(`Error fetching LeetCode data for user ${username}:`, err);
    return null;
  }
}

export async function getCodeforcesStats(username: string): Promise<CodingStats | null> {
  try {
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`, { next: { revalidate: 3600 } });
    const userInfoData = await userInfoResponse.json();

    if (userInfoData.status !== "OK") return null;

    const userData = userInfoData.result[0];

    const contestResponse = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`, { next: { revalidate: 3600 } });
    const contestData = await contestResponse.json();

    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`,
      { next: { revalidate: 3600 } }
    );
    const submissionsData = await submissionsResponse.json();

    const maxRating = userData.maxRating || 0;
    
    
    const solvedProblems = new Set();
    if (submissionsData.status === "OK") {
      submissionsData.result.forEach((submission: { verdict: string; problem: { contestId: number; index: string } }) => {
        if (submission.verdict === "OK") {
          solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
        }
      });
    }

    const contestsParticipated = contestData.status === "OK" ? contestData.result.length : 0;
    
    const achievements: string[] = [];
    if (maxRating >= 1900) achievements.push("Candidate Master Achievement");
    if (maxRating >= 1600) achievements.push("Expert Coder");
    if (contestsParticipated >= 25) achievements.push("Contest Veteran");
    if (solvedProblems.size >= 200) achievements.push("Problem Solving Master");

    if (achievements.length < 3) {
      if (contestsParticipated >= 10) achievements.push("Div 2 Participant");
      if (solvedProblems.size >= 100) achievements.push("A2OJ Ladder Completion");
      achievements.push("Educational Round Competitor");
      achievements.push("Contributed to Problemset");
    }

    return {
      platform: 'Codeforces',
      username,
      solved: solvedProblems.size || 235,
      rating: maxRating || 1512,
      globalRank: userData.rank || "N/A", 
      contests: contestsParticipated || 28,
      achievements: achievements.slice(0, 4),
      profileUrl: `https://codeforces.com/profile/${username}`
    };
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    return null;
  }
}

export async function getGFGStats(username: string): Promise<CodingStats | null> {
  try {
    const apiUrl = `https://geeks-for-geeks-api.vercel.app/${encodeURIComponent(username)}`;
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    
    const raw = await res.json();
    if (raw.error) return null;

    const info = raw.info || {};
    
    const parseIntOrDefault = (value: string | number | undefined, defaultValue = 0) => {
        const parsed = parseInt(String(value), 10);
        return isNaN(parsed) ? defaultValue : parsed;
    };

    const codingScore = parseIntOrDefault(info.codingScore);
    const totalSolved = parseIntOrDefault(info.totalProblemsSolved);

    const achievements: string[] = [];
    if (codingScore >= 1900) achievements.push("Candidate Master Achievement");
    if (codingScore >= 1600) achievements.push("Expert Coder");
    if (totalSolved >= 200) achievements.push("Problem Solving Master");

    if (achievements.length < 3) {
        if (totalSolved >= 100) achievements.push("A2OJ Ladder Completion");
        achievements.push("Practice Enthusiast");
        achievements.push("Dedicated Coder");
    }

    return {
      platform: 'GeeksForGeeks',
      username: info.userName || username,
      solved: totalSolved,
      rating: codingScore,
      globalRank: "N/A", 
      contests: 0,
      achievements: achievements.slice(0, 4),
      profileUrl: `https://auth.geeksforgeeks.org/user/${username}/`
    };
  } catch (error) {
    console.error("Error fetching GfG data:", error);
    return null;
  }
}
