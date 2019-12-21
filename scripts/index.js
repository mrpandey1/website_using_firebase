//fetching collection from firebase
const guideList=document.querySelector('.guides');
const logoutLinks=document.querySelectorAll('.logged-out');
const loginLinks=document.querySelectorAll('.logged-in');
const accountDetails=document.querySelector('.account-details');
const adminItems=document.querySelectorAll('.admin');
const setupUi=(user)=>
{
  if(user)
  {
    console.log(user.admin);
    if(user.admin)
    {
      adminItems.forEach(item=>item.style.display='block');
    }
    db.collection('users').doc(user.uid).get().then(doc=>{
      const html=`
      <div>Logged in as ${user.email}</div>
      <div>Name : ${doc.data().name}</div>
      <div>${user.admin ?'Admin':''}</div>
      `;
    accountDetails.innerHTML=html;
    });
    logoutLinks.forEach(items=>items.style.display='none');
    loginLinks.forEach(items=>items.style.display='block');
  }
  else
  {
    adminItems.forEach(item=>item.style.display='none');
  accountDetails.innerHTML='';
    logoutLinks.forEach(items=>items.style.display='block');
    loginLinks.forEach(items=>items.style.display='none');
  }
}
 const setupGuides =(data) =>{
  let html='';
  if(data.length!=0)
  {
  data.forEach(doc => {
    const guide=doc.data();
    const li=`
    <li>
      <div class="collapsible-header grey lighten-4">${guide.content}</div>
      <div class="collapsible-body white">written by- ${guide.name}</div>
    </li>
    `;
    html+=li;
  });
  guideList.innerHTML=html;
 }
 else{
  guideList.innerHTML='<h3 class="center grey-text">Please Login to View Quotes</h3>';
 }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});