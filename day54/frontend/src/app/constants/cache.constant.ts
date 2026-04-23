export const CACHE = {
  POSTS: {
    LIST: "posts:list",
    DETAIL(id: string) {
      return `posts:detail:${id}`;
    },
  },
};
