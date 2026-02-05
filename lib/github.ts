export interface GithubProfile {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GithubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

export interface GithubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: {
      message: string;
    }[];
    action?: string;
  };
}

const USERNAME = "surajarya0007";
const BASE_URL = "https://api.github.com";

export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(`${BASE_URL}/users/${USERNAME}`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`${BASE_URL}/users/${USERNAME}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error("Failed to fetch repos");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getGithubEvents(): Promise<GithubEvent[]> {
  try {
    const res = await fetch(`${BASE_URL}/users/${USERNAME}/events?per_page=10`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ... existing imports

export interface GithubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubContributions {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: GithubContributionDay[];
}

// Fetch contribution data from third-party API
export async function getGithubContributions(): Promise<GithubContributions | null> {
    try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`);
        if (!res.ok) throw new Error("Failed to fetch contributions");
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Process repos to generate Tech Stack Radar data
export function processTechStackData(repos: GithubRepo[]) {
    const categories: Record<string, number> = {
        Frontend: 0,
        Backend: 0,
        Mobile: 0,
        DevOps: 0,
        Data: 0,
        Design: 0
    };

    // Dictionary mapping languages/topics to categories
    const map = {
        // Frontend
        TypeScript: 'Frontend', JavaScript: 'Frontend', HTML: 'Frontend', CSS: 'Frontend', Vue: 'Frontend', React: 'Frontend', Svelte: 'Frontend',
        // Backend
        Python: 'Backend', Go: 'Backend', Java: 'Backend', PHP: 'Backend', Ruby: 'Backend', 'C#': 'Backend', Rust: 'Backend', 'C++': 'Backend', C: 'Backend',
        // Mobile
        Swift: 'Mobile', Kotlin: 'Mobile', Dart: 'Mobile', Flutter: 'Mobile',
        // Data
        'Jupyter Notebook': 'Data', R: 'Data', SQL: 'Data', PLSQL: 'Data',
        // DevOps
        Shell: 'DevOps', Dockerfile: 'DevOps', Makefile: 'DevOps', HCL: 'DevOps', PowerShell: 'DevOps',
        // Design usually isn't a language, but maybe CSS? Let's give Design some points if CSS/HTML is high or just hardcode a baseline.
    };

    repos.forEach(repo => {
        if (repo.language && map[repo.language as keyof typeof map]) {
            const cat = map[repo.language as keyof typeof map];
            categories[cat as keyof typeof categories] += repo.stargazers_count + 10; // Base score + stars
        }
    });

    // Normalize to 150 scale roughly
    const maxScore = Math.max(...Object.values(categories), 1);
    
    return Object.keys(categories).map(subject => ({
        subject,
        A: Math.min(Math.round((categories[subject] / maxScore) * 150), 150),
        fullMark: 150
    }));
}

// Helper to process language data from repos
export function processLanguageData(repos: GithubRepo[]) {
  const languages: Record<string, number> = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  // Convert to array and sort
  return Object.entries(languages)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5
}
