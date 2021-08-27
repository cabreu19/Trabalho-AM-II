
function update(index,link){
     
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`) ;

    let lenTds = tds.length-1; 
    let linkUpdate = tds[lenTds-1]; 
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; 

    let button = inputs[lenInputs-1]; 


    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show';

     
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    button.addEventListener('click',()=>{
        if(dados(inputs)){
        const http = new XMLHttpRequest(); 
        const url=link; 
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); 
        

       
        http.setRequestHeader('Content-Type','application/json');
         
        for(let cont=0;cont<inputs.length;cont++){ 
            if(inputs[cont].disabled==true){
                inputs[cont].disabled=false;
            } else inputs[cont].disabled=true;
        }
    

        
        data.id = index; 
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); 

        http.send(dataToSend);

       
        http.onload = ()=>{ 

            if (http.readyState === 4 && http.status === 200) { 
                for(let cont=0;cont<spans.length;cont++){
                    if(spans[cont].className=="hidden"){
                        spans[cont].innerHTML = inputs[cont].value;
                        spans[cont].className="show";
                    } else{
                        spans[cont].className="hidden";
                    }
                }

                
                for(let cont=0;cont<inputs.length;cont++){
                    if(inputs[cont].className=="show"){
                        inputs[cont].className="hidden";
                        if(inputs[cont].disabled==false){
                            inputs[cont].disabled=true;
                        }
                    }
                }

                linkUpdate.className='show';
                linkRemove.className='show';
                tds[lenTds-2].className='hidden';
            } else {

                console.log("Ocorreu erro no processamento dos dados no servidor: ",http.responseText);
            }     
        }
    
    }
    });  

}

function remove(index,name,link){ 

    const http = new XMLHttpRequest();
    
    http.open("POST",link,true); 
    http.setRequestHeader('Content-Type','application/json'); 

    dataToSend = JSON.stringify({name:name}); 
   
    http.send(dataToSend);

    http.onload = ()=>{ 
        
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`); 
        }
        

    }
}
   
function add(link){
    let inputs = document.querySelectorAll(`input[data-ind='cadinp']`);
        if(dados(inputs)){
        const http = new XMLHttpRequest();
        let data = {name:"",email:"",address:"",age:"",height:"",vote:""};
        let dataToSend;

        http.open("POST",link,true);

        http.setRequestHeader('Content-Type','application/json');

        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.height = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data);

        http.send(dataToSend);
        http.onload = ()=> {
            if (http.readyState === 4 && http.status === 200){
                location.reload();
            }
        }
    }
}




