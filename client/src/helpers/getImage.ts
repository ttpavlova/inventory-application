import mBoots from "@/assets/m-boots-brown.jpg";
import wBoots from "@/assets/w-boots-black.jpg";
import heels from "@/assets/w-heels-black.jpg";
import mSneakersGray from "@/assets/m-sneakers-gray.jpg";
import wSneakersLightGray from "@/assets/w-sneakers-light-gray.jpg";
import mSneakersBlue from "@/assets/m-sneakers-blue.jpg";
import wSneakersPeach from "@/assets/w-sneakers-peach.jpg";
import mSneakersGreen from "@/assets/m-sneakers-green.jpg";
import wSneakersLemon from "@/assets/w-sneakers-lemon.jpg";
import type { ShoeView } from "../types/types";

export const getImage = (
  gender: ShoeView["gender"],
  category: ShoeView["category"],
  brand: ShoeView["brand"]
) => {
  const bootsImages = {
    Men: mBoots,
    Women: wBoots,
  };

  const heelsImage = heels;

  const sneakersImages: Record<string, { Men: string; Women: string }> = {
    Adidas: {
      Men: mSneakersGray,
      Women: wSneakersLightGray,
    },
    ["New Balance"]: {
      Men: mSneakersBlue,
      Women: wSneakersPeach,
    },
    Gucci: {
      Men: mSneakersGreen,
      Women: wSneakersLemon,
    },
  };

  switch (category) {
    case "Boots":
      return bootsImages[gender];
    case "Heels":
      return heelsImage;
    case "Sneakers":
      return sneakersImages[brand]?.[gender];
    default:
      return heelsImage;
  }
};
