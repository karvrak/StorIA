let text = "Chapitre 1 : ... Chapitre 2 : ... Chapitre 3 : ...";
let chapters = text.split(/(Chapitre \d+ :)/).filter((item, index) => index !== 0);

chapters = chapters.map((chapter, index) => {
  if(index % 2 !== 0) {
    return chapters[index - 1] + chapter;
  }
}).filter((item) => item);

console.log(chapters);