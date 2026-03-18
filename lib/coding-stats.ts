export interface CodingStats {
  platform: 'LeetCode' | 'Codeforces';
  username: string;
  solved: number;
  rating?: number | string;
  globalRank?: number | string;
  contests?: number;
  achievements?: string[];
  profileUrl: string;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; 

interface CacheEntry {
  timestamp: number;
  data: CodingStats;
}

async function fetchWithCache(
  key: string, 
  fetcher: () => Promise<CodingStats | null>
): Promise<CodingStats | null> {
  
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const parsed: CacheEntry = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          return parsed.data;
        }
      } catch (e) {
        console.warn("Invalid cache entry", e);
      }
    }
  }

  
  const data = await fetcher();

  
  if (data && typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {
      console.warn("Failed to save to localStorage", e);
    }
  }

  return data;
}

export async function fetchLeetCodeStats(username: string): Promise<CodingStats | null> {
  return fetchWithCache(`leetcode_${username}`, async () => {
    try {
      const res = await fetch(`/api/leetcode?username=${username}`);
      const data = await res.json();
      if (data.error) return null;
      
      return {
        platform: 'LeetCode',
        username,
        solved: data.problemsSolved || 0,
        globalRank: data.ranking,
        contests: data.contests,
        rating: data.highestRating,
        achievements: data.achievements,
        profileUrl: `https://leetcode.com/${username}/`
      };
    } catch (e) {
      console.error("Failed to fetch LeetCode stats", e);
      return null;
    }
  });
}

export async function fetchCodeforcesStats(username: string): Promise<CodingStats | null> {
  return fetchWithCache(`codeforces_${username}`, async () => {
    try {
      const res = await fetch(`/api/codeforces?username=${username}`);
      const data = await res.json();
      
      if (data.error) return null;

      return {
        platform: 'Codeforces',
        username,
        solved: data.problemsSolved || 0,
        rating: data.highestRating,
        globalRank: data.ranking,
        contests: data.contests,
        achievements: data.achievements,
        profileUrl: `https://codeforces.com/profile/${username}`
      };
    } catch (e) {
      console.error("Failed to fetch Codeforces stats", e);
      return null;
    }
  });
}
