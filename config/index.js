module.exports = {
 secret: process.env.NODE.ENV === "production"? process.env.SECRET: "HUFUBRBCBVYCAÇVCYVAHVHCHEBIBCJBHHECNJ256483GGIG",
 secret: process.env.NODE.ENV === "production"? "dominio do hospedagem": "http://localhost:3000",
 loja: process.env.NODE.ENV === "production"?"dominio do hospedagem da loja": "http://localhost:8000",
};
