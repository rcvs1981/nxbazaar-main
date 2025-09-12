"use client";

import React from "react";
import TrainingCard, { Training } from "@/components/TrainingCard";

interface RecentTrainingsProps {
  recentTrainings: Training[];
}

export default function RecentTrainings({ recentTrainings }: RecentTrainingsProps) {
  return (
    <div className="lg:col-span-2">
      <p className="text-xl font-bold text-gray-900 dark:text-slate-300">
        Related Trainings
      </p>

      <div className="mt-6 space-y-5">
        {recentTrainings.map((training, i) => (
          <TrainingCard key={i} training={training} />
        ))}
      </div>
    </div>
  );
}
