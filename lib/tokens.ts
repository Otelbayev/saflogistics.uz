/**
 * SAF Tokens — the loyalty programme.
 *
 * Every completed shipment (LCL or FTL) earns tokens automatically; tokens are
 * exchanged for free express delivery, cargo insurance or a discount on the
 * next shipment. The programme runs inside the Telegram mini-app
 * (`siteConfig.telegramBot`) — the site only presents it.
 *
 * Numbers live here and nowhere else, the same way `tariffs` in `./site` owns
 * the delivery windows. Copy — tier names, perk wording, reward labels — stays
 * in `messages/*.json`, keyed by the same keys.
 */

export const tokenTierKeys = ["bronze", "silver", "gold", "platinum"] as const;
export type TokenTierKey = (typeof tokenTierKeys)[number];

/**
 * Entry threshold for each tier, in completed shipments.
 *
 * Derived from the mini-app: a client with 13 shipments sits at Silver, so
 * Silver must start at or below 13 and Gold above it. The brief writes the
 * thresholds as "5/15/30/50" — that reads as Silver 5, Gold 15, Platinum 30,
 * with Bronze as the entry tier. Confirm with the client before launch.
 */
export const tokenTiers: Record<TokenTierKey, { from: number }> = {
  bronze: { from: 0 },
  silver: { from: 5 },
  gold: { from: 15 },
  platinum: { from: 30 },
};

export const rewardKeys = [
  "discount100",
  "express",
  "insurance",
  "discount10000",
] as const;
export type RewardKey = (typeof rewardKeys)[number];

/** Prices confirmed from the mini-app's "Обмен токенов" screen. */
export const rewards: Record<RewardKey, { price: number }> = {
  discount100: { price: 1_000 },
  express: { price: 5_000 },
  insurance: { price: 5_000 },
  discount10000: { price: 100_000 },
};

/**
 * "100 000" rather than "100000". Uzbek, Russian and English all group
 * thousands with a space here, so one non-locale-aware formatter is enough and
 * the number renders identically on the server and the client — `toLocaleString`
 * would not guarantee that.
 */
export const formatTokens = (value: number): string =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
