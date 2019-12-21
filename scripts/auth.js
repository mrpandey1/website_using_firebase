//adding admins
const adminForm=document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const adminEmail=document.querySelector('#admin-email').value;
    const addAdminRole=functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result=>
        {
            alert(adminEmail+" is now admin");
            adminForm.reset();
        });
});

//stream for any change in user
auth.onAuthStateChanged(user=>
    {
        if(user)
        {
            user.getIdTokenResult().then(idTokenResult=>
                {
                    user.admin=idTokenResult.claims.admin; 
                    setupUi(user);
                db.collection('quotes').onSnapshot(snapshot=>
                {
              setupGuides(snapshot.docs);
                },err=>
                {
                    console.log(err.message)
                });
                  });
        }
        else
        {
            setupUi();
            setupGuides([]);
        }
    });
//creating a quote
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    db.collection('quotes').add({
        name:createForm['title'].value,
        content:createForm['content'].value
    }).then(()=>
    {
        //close modal and reset form
        const quoteform=document.querySelector('#modal-create');
        M.Modal.getInstance(quoteform).close();
        createForm.reset();
    }).catch(err=>
        {
            console.log(err.message)
        })
});

//signup user
const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //getting user info
    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email,password).then(cred=>
        {
            return db.collection('users').doc(cred.user.uid).set({
                name:signupForm['signup-name'].value
            });
        }).then(()=>{
            const modal=document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
            signupForm.querySelector('.error').innerHTML='';
        }).catch(err=>
            {
                signupForm.querySelector('.error').innerHTML=err.message;
            });
});
//logging out a user
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>
{
e.preventDefault();
auth.signOut().then(
  console.log('signed out')  
);
});
//logging out a user
const logout2=document.querySelector('#logout2');
logout2.addEventListener('click',(e)=>
{
e.preventDefault();
auth.signOut().then(
  console.log('signed out')  
);
});

//signin a user
const loginForm=document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email,password).then(cred=>
        {
        
            console.log(cred.user.uid);
            const modal=document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        }).catch(err=>
            {
                loginForm.querySelector('.error').innerHTML=err.message;
                loginForm.reset();
            });
    })