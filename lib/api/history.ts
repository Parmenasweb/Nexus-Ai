import { prisma } from "@/lib/db";

// export async function createHistoryEntry({
//   toolType,
//   action,
//   prompt,
//   result,
//   credits,
//   metadata,
// }: {
//   toolType: string;
//   action: string;
//   prompt?: string;
//   result?: string;
//   credits: number;
//   metadata?: any;
// }) {
//   const { userId } = auth();

//   if (!userId) {
//     throw new Error("User not authenticated");
//   }

//   // Create history entry
//   const entry = await prisma.history.create({
//     data: {
//       userId,
//       toolType,
//       action,
//       prompt,
//       result,
//       credits,
//       status: "completed",
//       metadata: metadata || {},
//     },
//   });

//   // Update user credits
//   await prisma.user.update({
//     where: { id: userId },
//     data: {
//       credits: {
//         decrement: credits,
//       },
//     },
//   });

//   return entry;
// }

// export async function getUserHistory(page = 1, limit = 10) {
//   const { userId } = auth();

//   if (!userId) {
//     throw new Error("User not authenticated");
//   }

//   const skip = (page - 1) * limit;

//   const [history, total] = await Promise.all([
//     prisma.history.findMany({
//       where: { userId },
//       orderBy: { createdAt: "desc" },
//       skip,
//       take: limit,
//     }),
//     prisma.history.count({
//       where: { userId },
//     }),
//   ]);

//   return {
//     history,
//     pagination: {
//       page,
//       limit,
//       total,
//       pages: Math.ceil(total / limit),
//     },
//   };
// }

// export async function getUserCredits() {
//   const { userId } = auth();

//   if (!userId) {
//     throw new Error("User not authenticated");
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { credits: true },
//   });

//   return user?.credits || 0;
// }
