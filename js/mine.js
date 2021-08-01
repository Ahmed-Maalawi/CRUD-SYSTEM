const pName = document.getElementById('inpName'),
    pPrice = document.getElementById('inpPrice'),
    pDec = document.getElementById('inpDec'),
    serchInp = document.getElementById('inp-serch'),
    form = document.getElementById('my-form'),
    nav = document.querySelector('nav'),
    addBtn = document.getElementById('addBtn');
// ---------------------------------------------

// ---------- (add events to elements) -------------
serchInp.addEventListener('blur', displayProdcts);

pPrice.addEventListener('blur', pPriceValidation)

pName.addEventListener('blur', pNameValidation);

pDec.addEventListener('blur', pDecValidation);

addBtn.addEventListener('click',event => {

    event.preventDefault();

    addProduct();
    
});

// ------------------------------(on loading the page)-------------

if(localStorage.getItem('productCollection') != null) {

    var productList = JSON.parse(localStorage.getItem('productCollection'));
    
    displayProdcts();
    
} else {

    document.getElementById('table-content').innerHTML = '<h2 class="text-capitalize p-5 text-center shadow position-absolute  fixed-top"> no product added</h2>';

    var productList = [];
    
}

// --------------------------------------------------------------- 
// ----------------- (add function) ----------------
function addProduct() {

    var product = {

        pName_: pName.value,
        pPrice_: pPrice.value,
        pDec_: pDec.value
    };

    productList.push(product);

    localStorage.setItem('productCollection', JSON.stringify(productList));

    pName.value = null;
    pPrice.value = null;
    pDec.value = null;
    pName.classList.remove('is-valid','is-invalid');
    pPrice.classList.remove('is-valid','is-invalid');
    pDec.classList.remove('is-valid','is-invalid');

    displayProdcts();
    
}

// ----------------- (display function) ---------------
function displayProdcts() {

    var str = '';
    
    for(let i = 0; i < productList.length; i++) {
    
        str += `
        <tr>
            <th scope="row">${i+1}</th>
            <td>${productList[i].pName_}</td>
            <td>${productList[i].pPrice_}</td>
            <td>${productList[i].pDec_}</td>
            <td><button class="btn btn-info text-white edit"><i class="fas fa-edit"></i></button></td>
            <td><button class="btn btn-danger text-white delet"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`;
    }

    document.getElementById('table-content').innerHTML = str;

    // -------------- (add edit on click) -------------
    var editBtns = document.querySelectorAll('button.edit');
    
    editBtns.forEach(item => {

        item.addEventListener('click', event => {

            upDateProduct(event.target.offsetParent.parentNode.childNodes[1].textContent);

        });
    });

    // ------------------ (add delet on click) -------------
    var deletBtns = document.querySelectorAll('button.delet');
    
    deletBtns.forEach(item => {
    
        item.addEventListener('click', event => {
        
            deletProduct(event.target.offsetParent.parentNode.childNodes[1].textContent);
        });
    });
    
    if(productList.length == 0)
        document.getElementById('table-content').innerHTML = '<h2 class="text-capitalize p-5 text-center shadow position-absolute  fixed-top"> no product added</h2>';
    
}

function deletProduct(proId) {

    productList.splice(proId-1, 1);

    localStorage.setItem('productCollection', JSON.stringify(productList));

    displayProdcts();

    if(productList.length == 0) {

        document.getElementById('table-content').innerHTML = '<h2 class="text-capitalize p-5 text-center shadow position-absolute  fixed-top"> no product added</h2>';
    }
}

// ----------------- (update function) -------------------------
function upDateProduct(proId) {

    pName.value = productList[proId-1].pName_;
    pPrice.value = productList[proId-1].pPrice_;
    pDec.value = productList[proId-1].pDec_;

    deletProduct(proId);

    displayProdcts();
}

// ------------------- (search function) ------------------------
serchInp.addEventListener('keyup', () => {

    var str = '';

    for(i = 0; i < productList.length; i++){

        if(productList[i].pName_.toLowerCase().includes(serchInp.value.toLowerCase())) {

            str += `
                <tr>
                <th scope="row">${i+1}</th>
                <td>${productList[i].pName_.replace(serchInp.value,`<span style="background-color: yellow;">${serchInp.value}</span>`)}</td>
                <td>${productList[i].pPrice_}</td>
                <td>${productList[i].pDec_}</td>
                <td><button class="btn btn-info text-white edit"><i class="fas fa-edit"></i></button></td>
                <td><button class="btn btn-danger text-white delet"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`;
        }
    }

    document.getElementById('table-content').innerHTML = str;

    // -------------- (add edit on click) -------------
    var editBtns = document.querySelectorAll('button.edit');
    
    editBtns.forEach(item => {

        item.addEventListener('click', event => {

            upDateProduct(event.target.offsetParent.parentNode.childNodes[1].textContent);

        });
    });
    
    // ------------------ (add delet on click) -------------
    var deletBtns = document.querySelectorAll('button.delet');
    
    deletBtns.forEach(item => {
    
    item.addEventListener('click', event => {
    
        deletProduct(event.target.offsetParent.parentNode.childNodes[1].textContent);
        });
    });
    
});


// ------------ (form validation functions) ---------------
form.addEventListener('focusout', () => {

    if(
        pName.classList.contains('is-valid') &&
        pPrice.classList.contains('is-valid') &&
        pDec.classList.contains('is-valid')
       ) {

        addBtn.removeAttribute('disabled',true);

    } else {

        addBtn.setAttribute('disabled',true);

    }
});

// -----------------------------------------

function pDecValidation() {

    let pattern = /^\w{4,30}$/;

    if(pattern.test(pDec.value)) {

        pDec.classList.add('is-valid');
        pDec.classList.remove('is-invalid');

    } else {

        pDec.classList.remove('is-valid');
        pDec.classList.add('is-invalid');

    }
}

// -----------------------------------------

function pNameValidation() {

    let pattern = /^\w{1,20}$/;

    if(pattern.test(pName.value)){

        pName.classList.add('is-valid');
        pName.classList.remove('is-invalid');

    } else {

        pName.classList.remove('is-valid');
        pName.classList.add('is-invalid');

    }
}

// -----------------------------------------

function pPriceValidation(){

    let regularExpre = /^\d{1,7}?.{1,3}$/;

    if(regularExpre.test(pPrice.value) == true){

       pPrice.classList.add('is-valid');
       pPrice.classList.remove('is-invalid');

    } else {

        pPrice.classList.remove('is-valid');
       pPrice.classList.add('is-invalid');

    }
}


// ------------------------------------

const toggle = document.getElementById('toggle');

toggle.addEventListener('click', () => {

    toggle.classList.toggle('active');  
    document.body.classList.toggle('active');
    nav.classList.toggle('navbar-dark');  
    nav.classList.toggle('navbar-light');  
    nav.classList.toggle('bg-dark');  
    nav.classList.toggle('bg-lignt');  
});