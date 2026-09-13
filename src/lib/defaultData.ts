import type { AppData } from "../types";

export const DEFAULT_SECRET_CODE = "BLACKWHITE";

export const DEFAULT_APP_DATA: AppData = {
  secretCode: DEFAULT_SECRET_CODE,
  theme: "system",
  products: [
    {
      id: "headphones",
      name: "Headphones",
      bestExtra: 85,
      goodExtra: 105,
      maxExtra: 135,
    },
    {
      id: "bluetooth-speaker",
      name: "Bluetooth Speaker",
      bestExtra: 450,
      goodExtra: 550,
      maxExtra: 650,
    },
    {
      id: "charger",
      name: "Charger",
      bestExtra: 60,
      goodExtra: 90,
      maxExtra: 130,
    },
    {
      id: "cable",
      name: "Cable",
      bestExtra: 40,
      goodExtra: 60,
      maxExtra: 90,
    },
  ],
};
