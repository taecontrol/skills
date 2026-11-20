import { writeFileSync } from "node:fs";
export const base = process.env.CATALOG_URL ?? "http://127.0.0.1:34345";
export async function call(name, input, { member = "member@example.com", at = "2026-11-02T17:06:00Z" } = {}) {
  const response = await fetch(`${base}/api/${name}`, { method: "POST", headers: { "content-type": "application/json", "x-capture-member": member, "x-capture-time": at }, body: JSON.stringify(input) });
  const body = await response.json();
  if (!response.ok) throw new Error(`${name}: ${JSON.stringify(body)}`);
  return body;
}
export const definitions = [
  ["Arroz Gallo Oro 500 g", "Gallo", {amount:500,unit:"g"}, "arroz",2,"2026-09-30"],
  ["Arroz largo fino Gallo Oro 1 kg","Gallo",{amount:1000,unit:"g"},"arroz",4,"2026-10-28"],
  ["BANANA ECUADOR XKG",null,null,null,4,"2026-10-29"],
  ["Detergente Magistral limón 750 ml","Magistral",{amount:750,unit:"ml"},"detergente",3,"2026-10-05"],
  ["ECUVITA",null,null,null,1,"2026-10-30"],
  ["GALLO",null,null,null,3,"2026-10-15"],
  ["Lavandina Ayudín 2 l","Ayudín",{amount:2000,unit:"ml"},"lavandina",2,"2026-08-22"],
  ["Leche entera La Serenísima 1 l","La Serenísima",{amount:1000,unit:"ml"},"leche entera",14,"2026-11-01"],
  ["LECHE SERENISIMA ENT 1L",null,{amount:1000,unit:"ml"},null,0,null],
  ["Papel higiénico Elite doble hoja 4 rollos x 30 m","Elite",{amount:4,unit:"unit"},"papel higiénico",4,"2026-10-12"],
  ["Pilas AA Duracell x4","Duracell",{amount:4,unit:"unit"},null,0,null],
  ["Queso cremoso La Paulina","La Paulina",null,"queso cremoso",7,"2026-10-31"],
  ["Tomate perita",null,null,"tomate",9,"2026-11-01"],
  ["Yerba mate Playadito 1 kg","Playadito",{amount:1000,unit:"g"},"yerba",5,"2026-10-25"],
  ["ARROZ GALLO ORO 1K",null,{amount:1000,unit:"g"},null,2,"2026-10-20"],
];
export async function seed() {
  let cursor;
  const purchases = [];
  do { const page = await call("list_purchases", {limit:50,...(cursor?{cursor}:{})}); purchases.push(...page.purchases); cursor=page.nextCursor; } while(cursor);
  for(const purchase of purchases) await call("delete_purchase", {purchaseId:purchase.id});
  for(const product of (await call("list_products", {limit:50})).products) await call("delete_product", {productId:product.id});
  for(const kind of (await call("list_kinds", {})).kinds) await call("delete_kind", {kindId:kind.id});
  const ids={};
  for (const [name,brand,size,kind,count,last] of definitions) {
    for (let i=0;i<Math.max(1,count);i++) {
      const {purchase}=await call("record_purchase", {requestId:`seed-${name}-${i}`,store:{chain:"Coto",branch:"Sucursal"},date:last??"2026-10-01",total:100,lines:[{rawText:name,amount:100,newProduct:{name,...(brand?{brand}:{}),...(size?{size}:{}),...(kind?{kind}:{})}}]});
      ids[name]=purchase.lines[0].product.id;
      if(count===0) await call("delete_purchase",{purchaseId:purchase.id});
    }
  }
  for(const kind of ["fideos","leche descremada"]) {
    await call("update_product",{productId:ids.ECUVITA,kind});
    await call("update_product",{productId:ids.ECUVITA,kind:null});
  }
  const result=await call("merge_products",{requestId:"seed-ana-rice",productId:ids["ARROZ GALLO ORO 1K"],intoProductId:ids["Arroz largo fino Gallo Oro 1 kg"]},{member:"partner@example.com",at:"2026-10-20T21:42:00Z"});
  const products=(await call("list_products",{limit:50})).products;
  if(products.length!==14 || products.filter(p=>!p.kind).length!==5 || result.product.purchases!==6 || result.merge.mergedBy!=="partner@example.com" || result.merge.mergedAt!=="2026-10-20T21:42:00.000Z") throw new Error(`Seed mismatch ${JSON.stringify(result)}`);
  writeFileSync(new URL("seed-data.json",import.meta.url),JSON.stringify({ids,products,merge:result.merge},null,2));
  return ids;
}
if (process.argv[1] === new URL(import.meta.url).pathname) { await seed(); console.log("Seeded 14 products, Ana's merge and 10 kinds via HTTP operations."); }
