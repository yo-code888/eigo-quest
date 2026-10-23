
async function loadHighschoolWords() {
  const response = await fetch("./words-highschool.csv");

  if (!response.ok) {
    throw new Error("CSVの読み込みに失敗しました");
  }

  const csv = await response.text();

  const lines = csv
    .replace(/^\uFEFF/, "")
    .trim()
    .split(/\r?\n/);

  const words = lines.slice(1).map(line => {
    const columns = line.split(",");

    return {
      number: columns[0].trim(),
      en: columns[1].trim(),
      ja: columns.slice(2).join(",").trim(),
      example: "",
      exampleJa: ""
    };
  }).filter(word => word.en && word.ja);

  window.HIGHSCHOOL_WORDS = words;

  console.log("高校英単語:", words.length, "語を読み込みました");

  return words;
}

loadHighschoolWords().catch(error => {
  console.error(error);
});
