export interface Course {
  id: string;
  title: string;
  url: string;
  image: string;
  description: string;
}

export const courses: Course[] = [
  {
    id: "ai-productivity",
    title: "AI for Productivity Video Upgrade",
    url: "https://www.idplr.com/ai-for-productivity-video-upgrade",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "Learn how to leverage AI tools to 10x your daily productivity and streamline your workflow."
  },
  {
    id: "wfh-productivity",
    title: "Work From Home Productivity Video Upgrade",
    url: "https://www.idplr.com/89-videos/work-from-home-productivity-video-upgrade",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800",
    description: "Master remote work with proven strategies to stay focused, motivated, and highly effective at home."
  },
  {
    id: "virtual-summit",
    title: "Virtual Summit Secrets Video Upgrade",
    url: "https://www.idplr.com/89-videos/virtual-summit-secrets-video-upgrade",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800",
    description: "Discover the secrets to hosting wildly successful virtual summits that grow your audience and revenue."
  },
  {
    id: "solopreneur-success",
    title: "Solopreneur Success Video Upgrade",
    url: "https://www.idplr.com/89-videos/solopreneur-success-video-upgrade",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=800",
    description: "The complete guide to thriving as a one-person business and achieving sustainable growth."
  },
  {
    id: "freelance-business",
    title: "How To Start a Freelance Business Video Upgrade",
    url: "https://www.idplr.com/89-videos/how-to-start-a-freelance-business-video-upgrade",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    description: "Step-by-step instructions on launching a profitable freelance business from scratch."
  },
  {
    id: "simple-productivity",
    title: "Simple Productivity Video Course",
    url: "https://www.idplr.com/89-videos/simple-productivity-video-course",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    description: "A back-to-basics approach to getting more done in less time without burning out."
  }
];
