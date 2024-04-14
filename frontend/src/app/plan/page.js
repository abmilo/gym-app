'use client'
import { useContext, useEffect, useState } from "react";
import { getWorkoutPlan } from "@/api/workout-plan";
import AuthContext from "@/context/AuthProvider";

const WorkoutPlanPage = () => {
    const { auth } = useContext(AuthContext);
    const [workoutPlans, setWorkoutPlans] = useState([
        {
            id: '001',
            name: 'Weekly Full Body Workout',
            days: [
                {
                    day: 'Day 1 - Upper Body Strength',
                    exercises: [
                        { name: 'Bench Press', sets: 3, reps: '8-12' },
                        { name: 'Bent Over Rows', sets: 3, reps: '8-12' },
                        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '8-12' },
                        { name: 'Pull-ups', sets: 3, reps: 'to failure' },
                    ]
                },
                {
                    day: 'Day 2 - Lower Body Strength',
                    exercises: [
                        { name: 'Squats', sets: 3, reps: '8-12' },
                        { name: 'Deadlifts', sets: 3, reps: '8-12' },
                        { name: 'Leg Press', sets: 3, reps: '10-15' },
                        { name: 'Calf Raises', sets: 3, reps: '15-20' },
                    ]
                },
                {
                    day: 'Day 3 - Cardio & Core',
                    exercises: [
                        { name: 'Circuit (Jump rope, Mountain climbers, Planks)', sets: 3, reps: '1 min each' },
                        { name: 'Bicycle Crunches', sets: 3, reps: '15-20' },
                        { name: 'Russian Twists', sets: 3, reps: '15-20' },
                    ]
                },
                {
                    day: 'Day 4 - Active Recovery',
                    activities: ['Light Activity (Walking, Yoga, Light Swimming)']
                },
                {
                    day: 'Day 5 - Full Body Circuit',
                    exercises: [
                        { name: 'Push-ups', sets: 3, reps: '10' },
                        { name: 'Air Squats', sets: 3, reps: '15' },
                        { name: 'Dumbbell Rows', sets: 3, reps: '10 per arm' },
                        { name: 'Lunges', sets: 3, reps: '10 per leg' },
                        { name: 'Burpees', sets: 3, reps: '5' },
                    ]
                },
                {
                    day: 'Day 6 - Cardio Intervals',
                    exercises: [
                        { name: 'Intervals (Sprinting/Walking)', duration: '20 minutes', pattern: '1 min high, 2 min low' },
                    ]
                },
                {
                    day: 'Day 7 - Rest or Light Activity',
                    activities: ['Complete rest or very light activity like gentle stretching or a leisurely walk']
                },
            ]
        }
    ]);

    const handleGetWorkoutPlan = async () => {
        const res = await getWorkoutPlan(auth);
        if (res?.status === 200) {
            console.log("Workout Plans fetched successfully!");
            setWorkoutPlans(res.data);
        } else {
            console.log("Failed to fetch workout plans!");
        }
    }

    useEffect(() => {
        handleGetWorkoutPlan();
    }, [auth]);

    return (
        <>
            <div className="bg-white sm:px-6 lg:px-8 h-full">
                <div className="bg-white p-10">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-semibold leading-7 text-gray-900">Workout Plans</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-200">
                        {workoutPlans.map((plan, index) => (
                            <dl key={plan.id} className="divide-y divide-gray-200">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium text-gray-900">Plan Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{plan.name}</dd>
                                </div>
                                {plan.days.map((day, idx) => (
                                    <div key={idx} className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium text-gray-900">{day.day}</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                            <ul>
                                                {day.exercises ? day.exercises.map((exercise, exIndex) => (
                                                    <li key={exIndex}>{exercise.name}: {exercise.sets} sets of {exercise.reps}</li>
                                                )) : day.activities.map((activity, acIndex) => (
                                                    <li key={acIndex}>{activity}</li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkoutPlanPage;
