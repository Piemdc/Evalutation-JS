const apiURL ='https://fr.openfoodfacts.org/api/v0/product/';
let form=document.getElementById("valider")


form.addEventListener("submit", (e) => {
    e.preventDefault();
        let x = document.forms["recherche"]["validation"].value;
        if (x.match(/^[0-9]*$/) && x.length !== 12) {
            const code = document.getElementById("code").value;
        
            document.getElementById('liste').innerHTML = "";
            document.getElementById('listesup').innerHTML = "";
            document.getElementById('listeAL').innerHTML = "";
            document.getElementById("code").value="";

            showProduct(apiURL+code+'.json');
        }
        else {
    
    alert("Entrez un code barre valide");
    return false;
}
});




function showProduct(url){

    document.getElementById('main').classList.remove("display");
    fetch(url).then(res => res.json( ))

    .then(function(data){
               
            let produit = data.product;

            /* PRESENTATION PRODUIT */
            document.getElementById("product").innerHTML = `<h2 class="text-center mx-3 cap">${produit.product_name}</h2>
            <p class="text-center mt-4 mx-3">Code-barres: ${produit.code}</p>     
            <p class="mt-4 mx-3"><b>Dénomination générique :</b> ${produit.generic_name}</p>  
            <p class="mt-4 mx-3"><b>Marques :</b> ${produit.brands} </p>   
            <p class="mt-4 mx-3"><b>Lieux de fabrication ou de transformation :</b> ${produit.manufacturing_places} </p>`;

            /* IMAGE */
            document.getElementById('productimg').innerHTML =`<img src=${produit.image_front_url} class="img-thumbnail d-block mx-auto"  alt="${produit.generic_name}">`



            /*INGREDIENTS*/
            let ingredients = produit.ingredients
            

            for (i in ingredients){
 

                let liste = document.createElement('li');
                let ul = document.getElementById('liste');

                liste.setAttribute('class','list-group-item d-flex justify-content-between align-items-center ingredientli')
                liste.innerHTML =  `${ingredients[i].text.replace(/_/g,'')}`;

                let pourcent = document.createElement ('span');
                pourcent.setAttribute ('class','badge bg-primary rounded-pill')
                pourcent.innerHTML= `${Math.round(ingredients[i].percent_estimate*100)/100}%`
                
                ul.appendChild(liste)
                liste.appendChild(pourcent)
     
            }


            /* TABLEAU NUTRITIONNEL */

            let nutriTab = produit.nutriments
            document.getElementById("tabhead").innerHTML=`
            <th scope="col">Informations nutritionnelles</th>
            <th scope="col">Tel que vendu
            pour 100 g / 100 ml</th>
            <th scope="col">Tel que vendu
             par portion (${produit.serving_size})</th>`

///////////////////////////////////////////////////////////////////////////////
             document.getElementById("tab1").innerHTML = ` 
            <td>Énergie (kJ) </td>
            <td>${nutriTab["energy-kj_100g"]} ${nutriTab["energy-kj_unit"]} </td>
            <td>${nutriTab["energy-kj_serving"]} ${nutriTab["energy-kj_unit"]} </td>`

///////////////////////////////////////////////////////////////////////////////
            document.getElementById("tab2").innerHTML = ` 
            <td>Énergie (kcal) </td>
            <td>${nutriTab["energy-kcal_100g"]} ${nutriTab["energy-kcal_unit"]} </td>
            <td>${nutriTab["energy-kcal_serving"]} ${nutriTab["energy-kcal_unit"]} </td>`


///////////////////////////////////////////////////////////////////////////////
            document.getElementById("tab4").innerHTML = ` 
            <td>Matières grasses / Lipides</td>
            <td>${nutriTab.fat_100g} ${nutriTab.fat_unit} </td>
            <td>${nutriTab.fat_serving}  ${nutriTab.fat_unit}</td>`

///////////////////////////////////////////////////////////////////////////////
            document.getElementById("tab5").innerHTML = ` 
            <td><em> --- dont Acides gras saturés</em></td>
            <td>${nutriTab["saturated-fat_100g"]} ${nutriTab["saturated-fat_unit"]} </td>
            <td>${nutriTab["saturated-fat_serving"]} ${nutriTab["saturated-fat_unit"]} </td>`

///////////////////////////////////////////////////////////////////////////////
            document.getElementById("tab6").innerHTML = ` 
            <td>Glucides</td>
            <td>${nutriTab.carbohydrates_100g} ${nutriTab.carbohydrates_unit} </td>
            <td>${nutriTab.carbohydrates_serving}  ${nutriTab.fat_unit}</td>`

///////////////////////////////////////////////////////////////////////////////
           
            document.getElementById("tab7").innerHTML = ` 
            <td><em> --- dont Sucres</em></td>
            <td>${nutriTab.sugars_100g} ${nutriTab.sugars_unit} </td>
            <td>${nutriTab.sugars_serving}  ${nutriTab.sugars_unit}</td>`
            

 ///////////////////////////////////////////////////////////////////////////////           
            
            document.getElementById("tab8").innerHTML = ` 
            <td>Fibres</td>
            <td>${nutriTab.fiber_100g} ${nutriTab.fiber_unit} </td>
            <td>${nutriTab.fiber_serving}  ${nutriTab.fiber_unit}</td>`
            

///////////////////////////////////////////////////////////////////////////////
           
            document.getElementById("tab9").innerHTML = ` 
            <td>Protéines</td>
            <td>${nutriTab.proteins_100g} ${nutriTab.proteins_unit} </td>
            <td>${nutriTab.proteins_serving}  ${nutriTab.proteins_unit}</td>`
            

///////////////////////////////////////////////////////////////////////////////
            
            document.getElementById("tab10").innerHTML = ` 
            <td>Sel</td>
            <td>${nutriTab.salt_100g} ${nutriTab.salt_unit} </td>
            <td>${nutriTab.salt_serving}  ${nutriTab.salt_unit}</td>`
            

///////////////////////////////////////////////////////////////////////////////
          
            document.getElementById("tab11").innerHTML = ` 
            <td><em> --- Sodium</em></td>
            <td>${nutriTab.sodium_100g} ${nutriTab.sodium_unit} </td>
            <td>${nutriTab.sodium_serving}  ${nutriTab.sodium_unit}</td>`
        

///////////////////////////////////////////////////////////////////////////////
         
            
            document.getElementById("tab15").innerHTML = ` 
            <td>Score nutritionnel - France</td>
            <td>${produit.nutriscore_score} </td>
            <td>${produit.nutriscore_score} </td>`
            
///////////////////////////////////////////////////////////////////////////////
            
            document.getElementById("tab16").innerHTML = ` 
            <td><em> --- Nutri-Score</em></td>
            <td>${produit.nutriscore_grade} </td>
            <td>${produit.nutriscore_grade} </td>`
            

             /*REcyclage + info*/
             let recycle = ""
             produit.packaging ? recycle = produit.packaging : recycle = produit.packaging_text;

            var sliced = recycle.split(',')




            let ul = document.getElementById('listesup');
            let titreliste=document.createElement('li')
                    titreliste.setAttribute('class',' list-group-item d-flex justify-content-between align-items-center text-center')
                    titreliste.innerHTML =` <b> Instruction de recyclage et/ou informations d'emballage :</b>`
                    ul.appendChild(titreliste)

              for (i in sliced){

                let liste = document.createElement('li');
                    liste.setAttribute('class','ingredientli list-group-item d-flex justify-content-between align-items-center')
                    liste.innerHTML =  `${sliced[i]}`

               ul.appendChild(liste)   
                
              }

              /* Conditions de conservation*/

              let conservation = ""

              produit.conservation_conditions_fr ? conservation =produit.conservation_conditions_fr : conservation =" Aucune données"

              document.getElementById('conservation').innerHTML =`
              <h3 class="mt-4 mx-3 orange infostitre">Conditionnement :</h3>
              <b>Conditions de conservation :</b> ${conservation}`

               /*Service consommateur*/

               
              let customer = ""

              produit.customer_service_fr ? customer =produit.customer_service_fr : customer =" Aucune données"
              
               document.getElementById('consommateur').innerHTML =`
               <h3 class="mt-4 mx-3 orange infostitre">Fabricant :</h3>
               <b>Service consommateur :</b> ${customer}`

/* COndition changement pour huile de palme*/
let palm ='';
produit.ingredients_from_palm_oil_n === 0 ? palm ='1' : palm ='2' ;



    /* NOVA & nutriscore*/
    let alerts = document.getElementById('nutricones')
    alerts.innerHTML =`<img src="images/nova-group-${produit.nova_groups}.svg" class="nutri img-fluid blocs shadow p-4 col-5 col-md-3" alt="${produit.nova_groups}">   

    <img src="images/nutriscore-${produit.nutriscore_grade}.svg" class=" nutri img-fluid blocs shadow p-4 col-5 col-md-3" alt="nutriscore-${produit.nutriscore_grade}"> 

    <img src="images/palm-${palm}.svg" class=" nutri img-fluid blocs shadow p-4 col-5 col-md-3" alt="Huile de palme">     
    `


/* ALLERGENES */

            let allergie = ""
             produit.allergens_imported ? allergie = produit.allergens_imported : allergie = produit.allergens_from_ingredients;

            var slicedAL = allergie.split(',')

            let ulAL = document.getElementById('listeAL');
            let titrelisteAL=document.createElement('li')
                    titrelisteAL.setAttribute('class','list-group-item d-flex justify-content-between align-items-center text-center shadow')
                    titrelisteAL.innerHTML =` <b> Substances ou produits provoquant des allergies ou intolérances :</b>`
                    ulAL.appendChild(titrelisteAL)

              for (i in sliced){
                if (slicedAL[i] !== undefined)  {
                let listeAL = document.createElement('li');
                    listeAL.setAttribute('class','list-group-item d-flex justify-content-between align-items-center')
                     listeAL.innerHTML =  `${slicedAL[i]}`
                   
                  
               ulAL.appendChild(listeAL)   

            } ;
            }

  })
}

