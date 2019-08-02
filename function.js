function a()
{
 this.name="abc";
 this.age="12";    
}
var person=new a();
person.getage=function()
{
     this.age=13;
}
person.age1=function()
{
     return this.age;
}


person.getage();
console.log(person.age1());