// frontend/src/utils/loadGames.js
// --- NO papaparse needed any more ---
const loadGames = async () => {
  try {
    const response = await fetch("/games.json"); // <-- fetch JSON file
    if (!response.ok) throw new Error("Network error");

    const raw = await response.json(); // parse JSON
    /*  We normalise the keys here so the rest of the app can keep
        using { name, imageurl, url, description }              */
    const games = raw.map((item) => ({
      name: item["Name"],
      imageurl: item["Icon URL"],
      url: item["URL"],
      description: item["Description"],
    }));

    console.log("✅ games loaded:", games); // <-- sanity-check
    return games;
  } catch (err) {
    console.error("❌ loadGames failed:", err);
    return [];
  }
};

export default loadGames;
