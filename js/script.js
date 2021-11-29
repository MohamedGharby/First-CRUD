
var productName = document.getElementById('productName')
var productPrice = document.getElementById('productPrice')
var productCategory = document.getElementById('productCategory')
var productDescription = document.getElementById('productDescription')
var mainBtn = document.getElementById("mainBtn")

var productsContainer;
if (localStorage.getItem("savedProducts")== null) {
    productsContainer=[];
}
else{
    productsContainer= JSON.parse(localStorage.getItem("savedProducts"));
    display();

};

function addProduct() {

    if (required()==true) {
        var product={
            productName:productName.value,
            productPrice:productPrice.value,
            productCategory:productCategory.value,
            productDescription:productDescription.value
        }
        productsContainer.push(product);
        localStorage.setItem("savedProducts",JSON.stringify(productsContainer))
        display();
        clrProduct();
    }
    else{alert('Complete your Info about your product')}
};


function display(){
    var proTable=``
for (var i = 0; i < productsContainer.length; i++) {
    proTable += ` <tr>
             <td>${i}</td>
            <td>${productsContainer[i].productName}</td>
             <td>${productsContainer[i].productPrice}</td>
             <td>${productsContainer[i].productCategory}</td>
             <td>${productsContainer[i].productDescription}</td>
             <td> <button onclick="Update(${i})" class="btn btn-outline-warning">Update</button> </td>
             <td><button onclick="Delete(${i})" class="btn btn-outline-danger">Delete</button></td>
         </tr>`
};
document.getElementById('productsTable').innerHTML=proTable;
};

function clrProduct(){
        productName.value="",
        productPrice.value="",
        productCategory.value="",
        productDescription.value=""
};

function required(){
    if (productName.value!=""&&productPrice.value!=""&&productCategory.value!=""&&productDescription.value!="") {
        return true
    }
    else{return false};
};
function Delete(index){
    productsContainer.splice(index , 1);
    localStorage.setItem("savedProducts",JSON.stringify(productsContainer))
    display();
};

function search(searchInput){

    var proTable2 =``

    for (var i = 0; i < productsContainer.length; i++) {

        if (productsContainer[i].productName.toLowerCase().includes(searchInput.toLowerCase())) {
            proTable2 += ` <tr>
            <td>${i}</td>
           <td>${productsContainer[i].productName.replace(searchInput , '<span>'+searchInput+'</span>')}</td>
            <td>${productsContainer[i].productPrice}</td>
            <td>${productsContainer[i].productCategory}</td>
            <td>${productsContainer[i].productDescription}</td>
            <td> <button class="btn btn-outline-warning">Update</button> </td>
            <td><button onclick="Delete(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
    }
    document.getElementById('productsTable').innerHTML = proTable2;

}

function Update(index){
    productName.value = productsContainer[index].productName,
    productPrice.value = productsContainer[index].productPrice,
    productCategory.value = productsContainer[index].productCategory,
    productDescription.value = productsContainer[index].productDescription;
    Delete(index);
    mainBtn.innerHTML= "Update";
}
