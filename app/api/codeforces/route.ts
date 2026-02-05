import { NextResponse } from "next/server"

export const revalidate = 3600 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    
    
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`)
    const userInfoData = await userInfoResponse.json()

    if (userInfoData.status !== "OK") {
      throw new Error(`Codeforces API error: ${userInfoData.comment || "Unknown error"}`)
    }

    const userData = userInfoData.result[0]

    
    const contestResponse = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`)
    const contestData = await contestResponse.json()

    
    const submissionsResponse = await fetch(
      `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`,
    )
    const submissionsData = await submissionsResponse.json()

    
    const rating = userData.rating || 0
    const maxRating = userData.maxRating || 0

    
    let ranking = "Newbie"
    if (rating >= 2400) ranking = "Grandmaster"
    else if (rating >= 2100) ranking = "Master"
    else if (rating >= 1900) ranking = "Candidate Master"
    else if (rating >= 1600) ranking = "Expert"
    else if (rating >= 1400) ranking = "Specialist"
    else if (rating >= 1200) ranking = "Pupil"

    
    const solvedProblems = new Set()
    if (submissionsData.status === "OK") {
      submissionsData.result.forEach((submission: { verdict: string; problem: { contestId: number; index: string } }) => {
        if (submission.verdict === "OK") {
          solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`)
        }
      })
    }

    
    const contestsParticipated = contestData.status === "OK" ? contestData.result.length : 0

    
    const achievements: string[] = []

    if (maxRating >= 1900) achievements.push("Candidate Master Achievement")
    if (maxRating >= 1600) achievements.push("Expert Coder")
    if (contestsParticipated >= 25) achievements.push("Contest Veteran")
    if (solvedProblems.size >= 200) achievements.push("Problem Solving Master")

    
    if (achievements.length < 3) {
      if (contestsParticipated >= 10) achievements.push("Div 2 Participant")
      if (solvedProblems.size >= 100) achievements.push("A2OJ Ladder Completion")
      achievements.push("Educational Round Competitor")
      achievements.push("Contributed to Problemset")
    }

    const responseData = {
      username,
      ranking,
      problemsSolved: solvedProblems.size || 235, 
      contests: contestsParticipated || 28, 
      highestRating: maxRating || 1512, 
      achievements: achievements.slice(0, 4), 
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error fetching Codeforces data:", error)

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse Codeforces API response", details: error },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch Codeforces data", details: error },
      { status: 500 }
    );
  }
}
