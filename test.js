const fun = () => {
    return new Promise((resolve, reject) => {
        resolve("resolve");
    })
}

const lala =  async () => {
    // fun().then(res => {
    //     console.log(res)
    // })
    const res = await fun();
    console.log(res);
    console.log("asdfghj");
   
}

lala();