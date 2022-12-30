const addDot=(char)=>{
  let arr = []
  arr.push(char)
  arr.push(char+'.')
  arr.push('.'+char)
  arr.push('.'+char+'.')
  return arr
}
const possibleComb = (str) =>{
  let len = str.length
  
  if(len%2){
    let n = (len-1)/2
    let middleChar = [str[n]]
    for(let i = 0; i<n;i++){
      let temp = []
      middleChar.map((char)=>{
        addDot(char).map(c=>temp.push(c))
      })
      temp.map((c,j) =>{
        middleChar[j] = str[n-i-1]+c+str[n+i+1]
      })
    }
    return middleChar;
  }else{
    let n = (len-2)/2
    let middleChar = [str[(len/2)-1]+str[len/2],str[(len/2)-1]+'.'+str[len/2]]
    for(let i = 0; i<n;i++){
      let temp = []
      middleChar.map((char)=>{
        addDot(char).map(c=>temp.push(c))
      })
      temp.map((c,j) =>{
        middleChar[j] = str[n-i-1]+c+str[n+i+2]
      })
    }

    return middleChar
  }
}

//variables
const form = document.getElementById('form'),
input = document.getElementById('email'),
displayGmails = document.querySelector('.generated-mail'),
next = document.querySelector('.next-btn'),
prev = document.querySelector('.prev-btn'),
gmailContainer = document.querySelector('.all-gmail');

let initial = 0,
final = 10,
n=0,
allGmail=[];


const createGmailDiv = (gmail,domain) =>{
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.innerHTML = 'Hi'

  div.className = 'gmail'
  text = `${gmail}@${domain}`
  div.innerHTML = text
  div.appendChild(span)
  return div;
}




form.addEventListener("submit", (e)=>{
  e.preventDefault()
  const inputValue = input.value.split('@')
  Gmail = inputValue[0]
  Domain = inputValue[1]
  allGmail=[]
  n=0;
  allGmail = possibleComb(Gmail)
  n = allGmail.length;

  //empaty container
  
  displayGmails.classList.add('active')

  final = n<final?n:final;
  gmailContainer.innerHTML =''
  DisplayGmails(initial,final);

})

const Next = (i,f,n) =>{
  i = i>=0 && n<f? 0 : f;
  f = n<f ? n : (n-f)>10? f+10 : n;
  
  gmailContainer.innerHTML =''
  DisplayGmails(i,f);
  console.log(i,f,n)
}
const Prev = (i,f,n) =>{

}

const DisplayGmails = (i,f) =>{
for (let j = i; j < f; i++) {
  let gmail = allGmail[j];
  gmailContainer.appendChild(createGmailDiv(gmail,Domain));
}
}

next.addEventListener("click",()=>{
  Next(initial,final,n);
})
prev.addEventListener("click",()=>{
  Prev(initial,final,n);
  gmailContainer.innerHTML =''
  DisplayGmails(allGmail);
})