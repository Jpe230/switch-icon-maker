export const loadFile = async (file, reader) => {
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}


export const parseCSV = async (file) => {
  let reader = await loadFile(file, new FileReader());
  let content = reader.result;
  let lines = content.split(/\r?\n/);
  lines.shift();
  let entries = lines.filter((e) => e !== "").map((e, i) => {
    let entry =  e.split("|");
    return {titleName: entry[1], titleId: entry[0]};
  });

  return entries;
}