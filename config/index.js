module.exports = {
 secret: process.env.NODE.ENV === "production"? process.env.SECRET : "HUFUBRBCBVYCAÇVCYVAHVHCHEBIBCJBHHECNJ256483GGIG",
 api: process.env.NODE.ENV === "production"? "dominio do hospedagem" : "http://localhost:4000",
 loja: process.env.NODE.ENV === "production"?"dominio do hospedagem da loja": "http://localhost:8000",
};
