
async function loadHighschoolWords() {
  const response = await fetch("./words-highschool.csv");

  if (!response.ok) {
    throw new Error("英単語CSVを読み込めませんでした");
  }

  const csv = await response.text();

  return csv
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter(line => line.trim() !== "")
    .slice(1)
    .map(line => {
      const columns = line.split(",");

      return {
        number: columns[0]?.trim() || "",
        en: columns[1]?.trim() || "",
        ja: columns.slice(2).join(",").trim(),
        example: "",
        exampleJa: ""
      };
    })
    .filter(word => word.en && word.ja);
}

loadHighschoolWords()
  .then(words => {
    window.HIGHSCHOOL_WORDS = words;
    console.log("高校英単語の読み込み成功:", words.length, "語");
  })
  .catch(error => {
    console.error(error);
  });
