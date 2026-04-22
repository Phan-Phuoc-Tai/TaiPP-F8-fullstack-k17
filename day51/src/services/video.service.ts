import moment from "moment";
import { prisma } from "../lib/prisma";

export const videoService = {
  async create(url: string) {
    return prisma.video.create({
      data: {
        url,
      },
    });
  },
  async getInfo(url: string) {
    const baseAPI = process.env.YT_BASE_API;
    const apiKey = process.env.YT_API_KEY;
    const start = url.indexOf("v=") + 2;
    const end = url.indexOf("&");
    const id = end > 0 ? url.slice(start, end) : url.slice(start);

    const response = await fetch(
      `${baseAPI}?id=${id}&part=contentDetails,snippet,statistics&key=${apiKey}`,
      {
        method: "GET",
      },
    );
    const { items } = await response.json();

    const { statistics, contentDetails, snippet } = items[0];
    return {
      views: +statistics.viewCount,
      likes: +statistics.likeCount,
      comments: +statistics.commentCount,
      duration: moment.duration(contentDetails.duration).asSeconds(),
      title: snippet.title,
      thumbnail: snippet.thumbnails.maxres.url,
    };
  },
  async updateInfo(id: number) {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw new Error("Video not found");
    }
    const videoInfo = await this.getInfo(video.url);

    return prisma.video.update({
      where: {
        id,
      },
      data: {
        ...videoInfo,
        updatedAt: new Date(),
      },
    });
  },
  findAll() {
    return prisma.video.findMany();
  },
};
