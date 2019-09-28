let addRow = function(){
    let lastRow = document.getElementById('lastRow');  
    let nwRow = document.createElement('tr');
    nwRow.innerHTML = '<td contenteditable= true></td><td contenteditable= true></td><td contenteditable= true></td><td contenteditable= true></td>';
    lastRow.replaceWith(nwRow);
    table.append(lastRow);
} 
let makeRoom = async function(){
  if(+addbtn.value <= 0 || +addbtn.value > table.rows.length-2) return alert('Row number is not valid!');  

  let roomNumber = table.rows[addbtn.value].cells[0].textContent;
  let kind = table.rows[addbtn.value].cells[1].textContent;
  let specials = table.rows[addbtn.value].cells[2].textContent;
  let price = table.rows[addbtn.value].cells[3].textContent;
  
  let response = await fetch('/Admin/createRoom',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json;charset=utf-8' 
      },
      body: JSON.stringify({roomNumber,kind,specials,price})
  });

  
  if(response.status == 400) {
      let error = await response.text();
      return alert(`Error ${response.status}:Can not add,${error}`);}
  window.location = '/Admin/modify';
  
}
let deleteRoom = async function(){ 
   if(+delbtn.value <= 0 || +delbtn.value > table.rows.length-2) return alert('Row number is not valid!');

   let roomNumber = table.rows[delbtn.value].cells[0].textContent;
   let response = await fetch('/Admin/deleteRoom',{
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json;charset=utf-8' 
    },
    body: JSON.stringify({roomNumber})
    });

   if(response.status == 400) return alert(`Error ${response.status}:Can not perform deletion!`); 
   window.location = '/Admin/modify';   
}
let updater = async function(){
  if(+upbtn.value <= 0 || +upbtn.value > table.rows.length-2) return alert('Row number is not valid!');

  let roomNumber = table.rows[upbtn.value].cells[0].textContent;
  let kind = table.rows[upbtn.value].cells[1].textContent;
  let specials = table.rows[upbtn.value].cells[2].textContent;
  let price = table.rows[upbtn.value].cells[3].textContent;

  let response = await fetch('/Admin/update_room',{
      method:'PUT',
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      },
      body: JSON.stringify({roomNumber,kind,specials,price})

  });
  if(response.status == 400) return alert(`Error ${response.status}:Can not update!`);
  window.location = '/Admin/modify'; 
}