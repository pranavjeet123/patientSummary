const headers = ['SL', 'Date', 'Diagnosis', 'Weight', 'Doctor'];

const url = "https://jsonmock.hackerrank.com/api/medical_records?userId=";
const mydiv = document.getElementById("test-data");
const tableBody = document.querySelector("#patient-records-table > tbody")
const tableHeader = document.querySelector("#patient-records-table > thead")

function createNode(element){
    return document.createElement(element);
}

let  fetchPatient=((url)=>{
return  fetch(url)
.then ( (response)=>{ 
  return response.json();
})
.then ( (obj)=>{
    return obj;
})
.catch(function (error){
    console.log("something went wrong in fetching the data");
    console.log(error);
})
})

function GetSelectedValue(){
    let result='';
    let e = document.getElementById("patient-select");
    result = e.options[e.selectedIndex].value;
    let data = fetchPatient(url+result)
     data.then((result)=>{
        document.getElementById("loader-view").style.display="none";
        setPatientName(result);
        setPatientDob (result);
        setPatientHeight (result);
        
        generateTable(result.data);
         //console.log(result.data);
      return result.data;
   })
}

function setPatientName (result){
let patientName=  document.getElementById("patient-name");
patientName.innerHTML = result.data[0].userName;
}

function setPatientDob (result){
    let patientDob=  document.getElementById("patient-dob");
    patientDob.innerHTML = result.data[0].userDob;
    }

    function setPatientHeight (result){
        let patientHeight=  document.getElementById("patient-height");
        patientHeight.innerHTML = result.data[0].meta.height;
        }


 function generatetableHeader(headers){
    let headerTemp="";
for(var i=0;i<headers.length;i++){
    
   
    headerTemp+="<th>"+headers[i]+"</th>";
  

}

tableHeader.innerHTML="<tr>"+headerTemp+"</tr>";
 }



function generateTable (result){
    
    console.log(result);

    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild);
    }
    
     generatetableHeader(headers);
   
    //populating table
    let temp = "";
    let count=1;
    result.forEach((row)=>{
        let date = formatDate(row.timestamp);
        //console.log("date",date);
        let diagnosis = row.diagnosis.name;
        let id= row.diagnosis.id;
        let weight = row.meta.weight;
        let doctorName=row.doctor.name;
        
        temp+="<tr>";
        temp+="<td></td>";
        temp+="<td>"+date+"</td>";
        temp+="<td>"+diagnosis+"("+id+")"+"</td>";
        temp+="<td>"+weight+"</td>";
        temp+="<td>"+doctorName+"</td></tr>";
       
    })
   
    tableBody.innerHTML = temp;
    
   
}

function formatDate(d) 
{
let dateObj = new Date(d);
let month = dateObj.getMonth()+1;
let year = dateObj.getFullYear();
let date =  dateObj.getDate();  
return `${date}/${month}/${year}`;
}

