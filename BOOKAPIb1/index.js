 require("dotenv").config();
 
 //Frame work
 const express = require("express");
 const mongoose  = require("mongoose");

 //Database
 const database = require("./database/index");

 //Models
 const BookModel = require("./database/book");
 const AuthorModel = require("./database/author");
 const PublicationModel = require("./database/publication");
 
 //initializing express
 const shapeAI = express();

 //configurations
 shapeAI.use(express.json());

 //establish database connection
 mongoose.connect(
   process.env.MONGO_URL,
   {
     useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
   }
).then(() => console.log("connection established!!!"));


/* 
Route           /
Description     to get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/ 
 shapeAI.get("/" , async(req,res) => { 
     const getAllBooks = await BookModel.find();
     return res.json(getAllBooks);
 }); //INCOMPLETE

/* 
Route           /is
Description     to get specific book based on isbn 
Access          PUBLIC
Parameters      isbn
Method          GET
*/ 
 shapeAI.get("/is/:isbn",async(req,res)=> {

    const getSpecificBook = await BookModel.findOne({ISBN :req.params.isbn});
 
    if(!getSpecificBook){
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
   });
}

  return res.json({ book : getSpecificBook});
} );  //INCOMPLETE                

/* 
Route           /c
Description     to get specific books based on category
Access          PUBLIC
Parameters      category
Method          GET
*/ 
shapeAI.get("/c/:category",async(req,res) => {
  const getSpecificBook = await BookModel.findOne({category:req.params.category});
 
  if(!getSpecificBooks){
  return res.json({
    error: `No book found for the category of ${req.params.category}`,
 });
}


return res.json({ book : getSpecificBooks});

});

/* 
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/book/new",async(req,res) =>{
  const {newBook } = req.body;
  
  
  const addNewBook =  BookModel.create(newBook);

  
  return res.json({books: addNewBooks, message: "book was added!"});
  });

  /* 
Route           /book/update
Description     update the title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put(" /book/update/:isbn",(req,res) => {
database.books.forEach((book) => {
  if(book.ISBN === req.params.isbn) {
    book.title = req.body.bookTitle;
    return ;
  }
});
 return res.json({books: database.books});
});//incomplete

/* 
Route           /book/delete
Description     to delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/ 
shapeAI.delete("/book/delete/:isbn" , (req,res) => {
  const updatedBookDatabase = database.books.filter(
    (book)=> book.ISBN !== req.params.isbn
  );

  database.book = updatedBookDatabase ;
  return res.json({books:database.books});
});  //INCOMPLETE

/* 
Route           /book/delete/author
Description     delete a author from a book 
Access          PUBLIC
Parameters      isbn,authorId
Method          DELETE
*/ 

shapeAI.delete("/book/delete/author/:isbn/:authorId",(req,res) =>{
   //update the author database
  database.books.forEach((book) => {
    if(book.ISBN===req.params.isbn){
      const newAuthorList = book.authors.filter((author) => 
      author !==parseInt(req.params.authorId));
    
       book.authors =newAuthorList ;
     return ;   
    }
  });
    // update the author database
    database.authors.forEach((author) =>{
      if(author.id===parseInt(req.params.authorId)){
        const newBooksList = author.books.filter((book)=>
        book !== req.params.isbn);

        author.books = newBooksList;
        return ;
      }
    })
    return res.json({book :database.books,author:database.authors,message:"author was deleted "})
}); 

/* 
Route           /author
Description     to get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/ 
shapeAI.get("/author",async(req,res) => {
  const getAllAuthor = await authorModel.find()
 return res.json({authors:getAllAuthor})
});


/* 
Route           /is
Description     to get list of books based on author
Access          PUBLIC
Parameters      author
Method          GET
*/ 
shapeAI.get("/are/:id",(req,res)=> {
  const getBooksByAuthor = database.authors.filter((author) => author.id === req.params.id);

 if(getBooksByAuthor.length ===0){
 return res.json({
   error: `No book found by this author ${req.params.id}`,
});
}

return res.json({ book : getBooksByAuthor});
} ); //incomplete

/* 
Route           /author
Description     to get specific author
Access          PUBLIC
Parameters      name
Method          GET
*/ 
shapeAI.get("/author/:id",(req,res) => {
  const getSpecificAuthors = database.authors.filter((author) =>
 database.authors.books.includes(req.params.id)
  );

  if(getSpecificAuthors ===0){
    return res.json({
      error:`no auhtor found for name ${req.params.id}`
    });
  }
  
  return res.json({name:getSpecificAuthors});
}) ;//incomplete


/* 
Route           /author
Description     to get list of all author based on book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/ 
shapeAI.get("/author/:isbn",(req,res) => {
const getListOfAuthors = database.authors.filter((author) =>
author.books.includes(req.params.isbn)
);

if(getListOfAuthors ===0){
  return res.json({
    error:`no author found for the book ${req.params.isbn}`,
});

}

return res.json({authors:getListOfAuthors});
});

/* 
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/author/new",(req,res) => {
  const {newAuthor } = req.body;
  AuthorModel.create(newAuthor);

  return res.json({ message: "Author was added!"});
  });

   /* 
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put(" /book/author/update:isbn",(req,res) =>{
  //update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn)
     return book.authors.push(req.body.newAuthor);
  });

  //update the author database
  database.authors.forEach((author) => {
    if(author.id===req.body.newAuthor) 
    return author.books.push(req.params.isbn);
  });
  return res.json({books: database.books , authors : database.authors , message: "new author was added"});
}); //INCOMPLETE


/* 
Route           /
Description     to get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/ 
shapeAI.get("/publications",(req,res) => {
  return res.json({publications:database.publications})
});

/* 
Route           /p
Description     to get specific publications
Access          PUBLIC
Parameters      id
Method          GET
*/ 
shapeAI.get("/p/:id",(req,res) => {
  const getSpecificPublication = database.publications.filter((publication) => publication.id ===req.params.id);
  
  if(getSpecificPublication ===0){
    return res.json({
      error : `there is no specific publication for this ${req.params.id}`
    });
  }
  
  return res.json({publication:getSpecificPublication});
}); //incomplete

/* 
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/publication/new",(req,res) => {
  const {newPublication } = req.body;
  PublicationModel.create(newPublication);

  return res.json({publication: database.publications, message: "new publication  was added!"});
  });

  /* 
Route           /publication/update/book
Description    update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/ 
shapeAI.put("/publication/update/book:isbn" , (req,res)=>{
  //update the publication database
  database.publications.forEach((publication) =>{
    if(publication.id === req.body.pubId){
    return  publication.book.push(req.params.isbn);
    }
  } );

   //update the book database
   database.books.forEach((book)=>{
     if(book.ISBN === req.params.isbn){
       book.publication = req.body.pubId ;
       return;
     }
   });

   return res.json({
    books:database.books,
    publications:database.publications,
    message:"successfully updated publications",
  });
}); //INCOMPLETE

/* 
Route           /publication/delete/book
Description     delete a book from publications 
Access          PUBLIC
Parameters      isbn,publication Id
Method          DELETE
*/ 
shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res) =>{
  // upadate publication database
  database.publications.forEach((publication) =>{
    if(publication.id === parseInt(req.params.pubId)){
      const newBooksList = publication.books.filter((book) =>
      book !== req.params.isbn
      );

      publication.books = newBooksList ;
      return ;
    }
     
    // update book databse
    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn){
        book.publication = 0;  // no publication available
        return;
      }
    })
  });
  return res.json({books:database.books, publications:database.publications});
});


 shapeAI.listen(8080,() => console.log("server running"));
 
