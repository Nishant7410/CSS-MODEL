var h={
age:20,
hello:function()
{
console.log(this.age);
}
}
var hi=h.hello.bind(h);
hi();


