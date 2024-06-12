const fetchBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log("risposta fetch: ", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel fetch");
      }
    })
    .then((booksObj) => {
      let savedBooksToParse = sessionStorage.getItem("savedBooks");
      if (savedBooksToParse === null) {
        console.log("storage empty");
        sessionStorage.setItem("savedBooks", JSON.stringify(booksObj));
        savedBooksToParse = sessionStorage.getItem("savedBooks");
      }
      //sessionStorage.setItem("savedBooks", JSON.stringify(booksObj));
      //let savedBooksToParse = sessionStorage.getItem("savedBooks");
      savedBooks = JSON.parse(savedBooksToParse);
      console.log("savedbooks: ", savedBooks);

      console.log("booksObj: ", booksObj);

      const row = document.getElementById("card-container");

      savedBooks.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col");
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", `${book.asin}`);

        card.innerHTML = `
        <img src=${book.img} class="card-img-top" alt=${book.title}>
        <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p>Prezzo: ${book.price}€</p>
            
            <button onclick="removeBook(event)" class="removeBtn btn btn-danger">Rimuovi</button
        </div>
        `;
        col.appendChild(card);
        row.appendChild(col);
      });
    });
};

const removeBtn = document.getElementsByClassName("removeBtn");
console.log("rmvBtn",removeBtn);

const removeBook = function (event) {
  console.log("funzione rimuovi");
  console.log(this)
  event.target.closest(".col").remove();
};

for (let i = 0; i < removeBtn.length; i++) {
    console.log("messa funzione")
  removeBtn[i].onclick = removeBook;
}

/*removeBtn.forEach(btn => {  
    btn.onclick=removeBook;
});*/
//removeBtn.onclick = removeBook;

window.addEventListener("DOMContentLoaded", () => {
  // avvio della fetch al caricamento della pagina
  fetchBooks();
});
