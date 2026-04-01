import MealCard from "@/components/MealCard";
import Button from "@/components/Button";
import { getRandomItem } from "@/lib/random";
import styles from "@/styles/Home.module.css";
import { Meal } from "@/types/meal";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import AddMealForm from "@/components/AddMealForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selected, setSelected] = useState<Meal | null>(null);

  // 🔄 Fetch meals from Lambda
  useEffect(() => {
    fetch(
      "https://pp2omnr7fyryna5yokoxt2wori0zrbpk.lambda-url.ap-southeast-1.on.aws",
      { headers: { "x-api-key": "abc..." } },
    )
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        if (data.length > 0) {
          setSelected(getRandomItem(data));
        }
      });
  }, []);

  const pickRandom = () => {
    if (meals.length === 0) return;

    let newMeal;
    do {
      newMeal = getRandomItem(meals);
    } while (newMeal.id === selected?.id && meals.length > 1);

    setSelected(newMeal);
  };

  const handleAddMeal = (meal: Meal) => {
    setMeals((prev) => [...prev, meal]);
    setSelected(meal);
  };

  return (
    <>
      <Head>
        <title>What to eat?</title>
        <meta
          name="description"
          content="Choose a delicious treat for your boy!."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>🍽️ Hôm nay mình ăn gì nào? 🤤</h1>
            {selected && <MealCard name={selected.name} />}
          </div>
          <div className={styles.ctas}>
            <Button title="🎲 Chọn lại nhé!" onClick={pickRandom} />
            <AddMealForm onAdd={handleAddMeal} />
          </div>
        </main>
      </div>
    </>
  );
}
