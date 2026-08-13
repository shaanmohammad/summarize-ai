import Summary from "@/models/Summary";
import User from "@/models/User";
import { connectDB } from "@/utils/db";

export const revalidate = 60; // ISR: regenerate this page at most once every 60 seconds

async function getStats() {
  console.log("getStats ran at", new Date().toISOString());
  await connectDB();
  const totalSummaries = await Summary.countDocuments();
  const totalUsers = await User.countDocuments();
  return { totalSummaries, totalUsers };
}

export default async function StatsPage() {
  const { totalSummaries, totalUsers } = await getStats();

  return (
    <div>
      <p>{totalSummaries} summaries generated</p>
      <p>{totalUsers} people using SummarizeAI</p>
    </div>
  );
}