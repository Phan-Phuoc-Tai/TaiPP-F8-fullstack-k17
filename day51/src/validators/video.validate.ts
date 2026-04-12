import z from "zod";

export const videoValidate = z.object({
  url: z.string().refine(
    (url) => {
      return url.includes("www.youtube.com");
    },
    {
      message: "Url invalid",
    },
  ),
});
