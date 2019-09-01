function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{

return true;
}
else
{

return false;
}
}
if(ValidateEmail("ejfj.djfe@gmail.com"))
    console.log('valid');
else
    console.log('invlaid');