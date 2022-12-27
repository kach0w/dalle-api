import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  let submitValue = "Generate";
  async function onSubmit(event) {
    event.preventDefault();
    try {
      submitValue = "Generating..."
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      submitValue = "Generate"
      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/rusteze.png" />
      </Head>

      <main className={styles.main}>
        {/* <img src="/rusteze.png" className={styles.icon} /> */}
        <h3>DALL·E API</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter A Prompt..."
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value={submitValue} />
        </form>
        <div className={styles.result}>
          <img width={400} src={result} />
        </div>
        <div>
          <p>Made by <a href="https://github.com/kach0w">kach0w</a></p>
        </div>
      </main>
    </div>
  );
}
