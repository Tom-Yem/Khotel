let showReserved = async function(){
   
    if(table.rows.length > 1){
    while(table.rows.length > 1){
        table.deleteRow(1);
    }
   } 

   let check_in = document.getElementById('check-in').value;
   let check_out = document.getElementById('check-out').value;
   
   let response = await fetch('/Admin/list_reserved',{
       method:'POST',
       headers: {
        'Content-Type':'application/json;charset=utf-8'
       },
       body: JSON.stringify({check_in,check_out})
   });
   let rooms = await response.json();
   for(let room of rooms){
       let row = document.createElement('tr');
       row.innerHTML = `<td>${room.room_number}</td><td>${room.kind}</td>`
       table.append(row);
   }
};

let unreserveRoom = async function(){
   let roomNumber = +document.getElementById('room-num').value;
   let from = document.getElementById('check-in').value;
   let to = document.getElementById('check-out').value;

   let response = await fetch('/Admin/unreserve',{
       method: 'PUT',
       headers: {
        'Content-Type':'application/json;charset=utf-8'
       },
       body: JSON.stringify({ roomNumber,from,to})
   });
};