import { txt2vec } from "https://code4fukui.github.io/txt2vec/ADA002.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";
import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";

const url = "https://code4fukui.github.io/fukui-spot/fuku-e-spot.csv";
const data = await CSV.fetchJSON(url);
const input = data.map(d => d.description);
console.log(input);
const res = await txt2vec(input);
//await Deno.writeFile(prompt.replace(/ /g, "_") + ".png", bin);
console.log(res);
for (let i = 0; i < res.length; i++) {
  data[i].ada002 = Base64URL.encode(IEEE32.encode(res[i]));
}
await Deno.writeTextFile("fukui-spot_vec.csv", CSV.stringify(data));
