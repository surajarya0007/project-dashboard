import { NextResponse } from "next/server";

export const revalidate = 3600; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    
    const apiUrl = `https://geeks-for-geeks-api.vercel.app/${encodeURIComponent(
      username
    )}`;
    const res = await fetch(apiUrl); 

    
    
    const raw = await res.json();

    
    if (raw.error) {
      return NextResponse.json(
        { error: `GfG API error: ${raw.error}` },
        { status: res.status === 200 ? 404 : res.status } 
      );
    }
    
    
    if (!res.ok) {
        console.error(`GfG API HTTP Error (${res.status}) for user ${username}: ${await res.text()}`);
        return NextResponse.json(
            { error: `Failed to fetch GfG profile (HTTP status ${res.status})` },
            { status: res.status }
        );
    }


    
    const info = raw.info || {}; 
    const solvedStats = raw.solvedStats || {}; 

    
    const parseIntOrDefault = (value: string | number | undefined, defaultValue = 0) => {
        const parsed = parseInt(String(value), 10);
        return isNaN(parsed) ? defaultValue : parsed;
    };

    
    let ranking = "Beginner";
    const codingScore = parseIntOrDefault(info.codingScore);
    if (codingScore >= 2400) ranking = "Grandmaster";
    else if (codingScore >= 2100) ranking = "Master";
    else if (codingScore >= 1900) ranking = "Candidate Master";
    else if (codingScore >= 1600) ranking = "Expert";
    else if (codingScore >= 1400) ranking = "Specialist";
    else if (codingScore >= 1200) ranking = "Pupil";
  
      
    const achievements: string[] = [];

    if (codingScore >= 1900) achievements.push("Candidate Master Achievement");
    if (codingScore >= 1600) achievements.push("Expert Coder");
    if (parseIntOrDefault(info.totalProblemsSolved) >= 200) achievements.push("Problem Solving Master");

      
    if (achievements.length < 3) {
        if (parseIntOrDefault(info.totalProblemsSolved) >= 100) achievements.push("A2OJ Ladder Completion");
        achievements.push("Practice Enthusiast");
        achievements.push("Dedicated Coder");
    }

    const userData = {
      username: info.userName || username, 
      ranking: ranking,
      problemsSolved: parseIntOrDefault(info.totalProblemsSolved), 
      contests: 0, 
      highestRating: codingScore, 
      achievements: achievements.slice(0, 4), 

      
      problemsByDifficulty: {
        school: solvedStats.school?.count ?? 0,
        basic: solvedStats.basic?.count ?? 0,
        easy: solvedStats.easy?.count ?? 0, 
        medium: solvedStats.medium?.count ?? 0,
        hard: solvedStats.hard?.count ?? 0,
      },
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error(`Error fetching GfG profile from arnoob16's API for user ${username}:`, error);
    
    return NextResponse.json(
      { error: "Internal server error while processing GfG data", details: error },
      { status: 500 }
    );
  }
}
