let reserver = async function(btn){
   let roomNum = btn.className;
   
   let response = await fetch('/book/reserve',{
      method:'POST',
      headers:{
          'Content-Type':'application/json;charset=utf-8'
      },
      body: JSON.stringify({ roomNum}) 
   })
   document.getElementsByClassName(`${roomNum}`)[0]
   .closest('.element-container')
   .remove(); 
};