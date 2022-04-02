let books =[
    {
        ISBN:"12345ONE",
        title:"Getting started with MERN",
        authors:[1,2],
        language:"en",
        pubDate:"202-07-08",
        numOfPage:225,
        category:["fiction","programming","tech","web dev"],
        publication:1,
    },
    {
        ISBN:"12345TWO",
        title:"Getting started with PYTHON",
        authors:[1,2],
        language:"en",
        pubDate:"202-07-08",
        numOfPage:225,
        category:["fiction","tech","web dev"],
        publication:1,
    }
];

const authors = [
    {
        id:1,
        name:"pavan",
        books:["12345ONE"],
    },
    {
        id:2,
        name:"aditya",
        books:["12345TWO","12345ONE"],
    }
];
const publications  = [
    {
        id:1,
        name:"chakra",
        books:["12345ONE"],
    },
    {
        id:2,
        name:"magic",
        books:["12345ONE" ,"12345THREE"],
    },
];


module.exports = {books,authors,publications};
