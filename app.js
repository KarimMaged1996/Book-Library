const DOM={
    formCancel:document.querySelector('#formCancel'),
    newBook:document.querySelector('.newBook'),
    form:document.querySelector('form'),
    addBook:document.querySelector('form :nth-child(6)'),
    bookTitle:document.querySelector('#title'),
    bookAutor:document.querySelector('#author'),
    bookPages:document.querySelector('#pages'),
    readStatus:document.querySelector('#status'),
    booksContainer:document.querySelector('.booksContainer'),
   /* cardRemove:document.querySelectorAll('.cancel'),
    cardUpdate:document.querySelectorAll('.update'),*/
}
//Event listiner to show the form when the plus button in clickes
DOM.newBook.addEventListener('click',
()=>DOM.form.style.visibility='visible');
//Event listiner to hide the form when cancel button is clicked
DOM.formCancel.addEventListener('click',
()=>DOM.form.style.visibility='hidden');

const theLibrary=[];
let counter=0;

//the constructor function
function Book(title,author,pages,status){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.status=status;
}


//event listiner to make the form button create a new object
DOM.addBook.addEventListener('click',(e)=>{
    e.preventDefault();
    let obj=
    new Book(DOM.bookTitle.value,DOM.bookAutor.value,DOM.bookPages.value,
       DOM.readStatus.value);
   theLibrary.push(obj);
   DOM.form.style.visibility='hidden';
   appendCards();

});

//function to loop over theLibarary and print its content
function appendCards(){
           let card= document.createElement('div');
            card.classList.add('card');
            card.dataset.number=`${counter}`; //associate the card with index
            let title=document.createElement('div');
            let cancel=document.createElement('button');
            let author=document.createElement('div');
            let pages=document.createElement('div');
            let status=document.createElement('div');
            let update=document.createElement('button');
            title.textContent=theLibrary[counter].title;
            cancel.textContent='x';
            author.textContent=theLibrary[counter].author;
            pages.textContent=`${theLibrary[counter].pages} pages`;
            status.textContent=theLibrary[counter].status;
            update.textContent='Update';
            card.appendChild(title);
            card.appendChild(cancel);
            card.appendChild(author);
            card.appendChild(pages);
            card.appendChild(status);
            card.appendChild(update);
            DOM.booksContainer.appendChild(card);
            counter++;
            cancel.addEventListener('click', 
            ()=> DOM.booksContainer.removeChild(card));
            update.addEventListener('click',
            ()=>{
                if(status.textContent==='Completed'){status.textContent='Not yet'}
                else if(status.textContent==='Not yet'){status.textContent='Currently Reading'}
                else if(status.textContent==='Currently Reading'){status.textContent='Completed'}
            })
}



