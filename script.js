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
const generateBtn = document.getElementById('generate'),
input = document.getElementById('email'),
displayGmails = document.querySelector('.generated-mail'),
next = document.querySelector('.next-btn'),
prev = document.querySelector('.prev-btn'),
copyBtn = document.querySelector('.copy-btn'),
currentGmailCount = document.querySelector('.current'),
totalGmailCount = document.querySelector('.total'),
gmailContainer = document.querySelector('.all-gmail');

let n=0,
current =0,
allGmail;

const createGmailDiv = (gmail,domain) =>{
  const div = document.createElement('div');

  div.className = 'gmail'
  text = `${gmail}@${domain}`
  div.innerHTML = text
  return div;
}




generateBtn.addEventListener("click", (e)=>{
  e.preventDefault()
  const inputValue = input.value.split('@')
  Gmail = inputValue[0]
  Domain = inputValue[1]
  allGmail=[];
  n=0;
  current = 0;
  
  if(input.value.split('').includes('@') && Domain && Gmail){
    allGmail = possibleComb(Gmail)
    n = allGmail.length;
    displayGmails.classList.add('active')
    input.style.borderColor = 'black'
  }else{
   input.focus() 
   input.style.borderColor = 'red'
  }

  if(n>1){
    allGmail.shift()
    n = allGmail.length;
  }
  
  totalGmailCount.innerHTML = n;
  currentGmailCount.innerHTML = current+1;
  gmailContainer.innerHTML = ''
  gmailContainer.appendChild(createGmailDiv(allGmail[current],Domain));
  input.value = ' ';
})

next.addEventListener("click", ()=>{
  if(current+1<n){
    current +=1;
  }else{
    current =0;
  }
  gmail = allGmail[current]
  gmailContainer.innerHTML = ''
  gmailContainer.appendChild(createGmailDiv(gmail,Domain));
  currentGmailCount.innerHTML = current+1;
});
prev.addEventListener("click", ()=>{
  if(current>0){
    current -=1;
  }else{
    current =n-1;
  }
  gmail = allGmail[current]
  gmailContainer.innerHTML = ''
  gmailContainer.appendChild(createGmailDiv(gmail,Domain));
  currentGmailCount.innerHTML = current+1;
  
});

//copy text 
document.addEventListener("click", (e)=>{
  e.preventDefault();
  if(e.target.classList.contains('fa-regular')){
    console.log('find')
    let text = `${allGmail[current]}@${Domain}`
  navigator.clipboard.writeText(text);
  copyBtn.classList.add('copied');
  }else{
    copyBtn.classList.remove('copied');
  }
})