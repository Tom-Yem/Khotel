let reserve =async function(event){
   let roomNum = event.currentTarget.className;
   
   let response = await fetch('/book/reserve',{
      method:'POST',
      headers:{
          'Content-Type':'application/json;charset=utf-8'
      },
      body: JSON.stringify({ roomNum}) 
   })
   let elem = document.getElementsByClassName(`${roomNum}`)[0]
   .closest('.element-container');
   elem.parentNode.removeChild(elem); 
};