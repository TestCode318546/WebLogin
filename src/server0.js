const myFunction = () => {
    console.log('Hello');
  };
  
  myFunction();  // Hello
  
  myFunction = () => {  // จะเกิดข้อผิดพลาด TypeError: Assignment to constant variable.
    console.log('Goodbye');
  };  // จะไม่สามารถเขียนทับฟังก์ชันได้
  