async function f() {
    setTimeout(() => {
        console.log("async");
    },2000);
    
    console.log("before await");
    const x = await f;
    console.log("after await");
    return x;
}
const a = f();
console.log(a);
console.log("sync");