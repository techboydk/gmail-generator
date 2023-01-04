const addDot = (char) => {
  let arr = []
  arr.push(char)
  arr.push(char + '.')
  arr.push('.' + char)
  arr.push('.' + char + '.')
  return arr
}
const possibleComb = (str) => {
  let len = str.length

  if (len % 2) {
    let n = (len - 1) / 2
    let middleChar = [str[n]]
    for (let i = 0; i < n; i++) {
      let temp = []
      middleChar.map((char) => {
        addDot(char).map(c => temp.push(c))
      })
      temp.map((c, j) => {
        middleChar[j] = str[n - i - 1] + c + str[n + i + 1]
      })
    }
    return middleChar;
  } else {
    let n = (len - 2) / 2
    let middleChar = [str[(len / 2) - 1] + str[len / 2], str[(len / 2) - 1] + '.' + str[len / 2]]
    for (let i = 0; i < n; i++) {
      let temp = []
      middleChar.map((char) => {
        addDot(char).map(c => temp.push(c))
      })
      temp.map((c, j) => {
        middleChar[j] = str[n - i - 1] + c + str[n + i + 2]
      })
    }

    return middleChar
  }
}
//gmail container template
const createGmailContainer = (username) => {
  const div = document.createElement('div');
  div.className = 'gmail';
  const gmail = `${username}@${domain}`
  div.innerHTML = gmail;
  return div;
}
const createListItem = (index) => {
  const li = document.createElement('li'),
    span = document.createElement('span');
  span.className = 'item'
  li.className = index ? '' : 'active';
  span.innerHTML = index + 1;
  li.appendChild(span);
  return li;
}

//constant
const generateBtn = document.getElementById('generate'),
  select = document.getElementById('gmailperpage'),
  input = document.getElementById('username'),
  gmailContainer = document.querySelector('.gmail-container'),
  totalCount = document.querySelector('.total span'),
  currentCount = document.querySelector('.current'),
  paginationContainer = document.querySelector('.pagination ul');

//variables
let allUserName = [],
  inputValue,
  selectValue,
  domain,
  pageNum = 1,
  numOfPage,
  username,
  pagination = document.querySelectorAll('.pagination li');

///onchange get value from input and select
const onChange = () => {
  pageNum = '1'
  inputValue = input.value.split('@');
  selectValue = Number(select.value);
  username = inputValue[0];
  domain = inputValue[1];
  currentCount.firstElementChild.innerHTML = (pageNum - 1) * selectValue + 1;
  currentCount.lastElementChild.innerHTML = pageNum * selectValue;
  numOfPage = Math.ceil(allUserName.length / selectValue);
  gmailContainer.innerHTML = ''
  allUserName.map((username, index) => {
    if (index < selectValue * pageNum && index > (pageNum - 1) * selectValue - 1) {
      gmailContainer.appendChild(createGmailContainer(username));
    }
  })
  paginationContainer.innerHTML = ''
  if (numOfPage > 1) {
    for (let i = 0; i < numOfPage; i++) {
      paginationContainer.appendChild(createListItem(i));
    }
    pagination = document.querySelectorAll('.pagination li');
  }
}
input.onchange = onChange;
select.onchange = onChange;


//prevent to submit and show generated gmail
generateBtn.addEventListener('click', e => {
  e.preventDefault()
  onChange()
  if (input.value.includes('@') && domain !== '' && username !== '') {
    console.log(true);

    gmailContainer.innerHTML = ''
    allUserName = possibleComb(username);
    numOfPage = Math.ceil(allUserName.length / selectValue);
    totalCount.innerHTML = allUserName.length;
    allUserName.map((username, index) => {
      if (index < selectValue * pageNum && index > (pageNum - 1) * selectValue - 1) {
        gmailContainer.appendChild(createGmailContainer(username));
      }
    })
    input.parentElement.style.borderColor = "#ccc";
  }else {
    input.focus();
    input.parentElement.style.borderColor = "red";
    console.log(input.parentElement)
    currentCount.lastElementChild.innerHTML = 0;
    currentCount.firstElementChild.innerHTML = 0;
    gmailContainer.innerHTML =''
    paginationContainer.innerHTML = ''
  }

  //pagination
  if (numOfPage > 1) {
    paginationContainer.innerHTML = ''
    for (let i = 0; i < numOfPage; i++) {
      paginationContainer.appendChild(createListItem(i));
    }
    pagination = document.querySelectorAll('.pagination li');
    
  }
})


// all click handler

document.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('item')) {
    pageNum = Number(e.target.innerHTML);
    gmailContainer.innerHTML = ''
    allUserName.map((username, index) => {
      if (index < selectValue * pageNum && index > (pageNum - 1) * selectValue - 1) {
        gmailContainer.appendChild(createGmailContainer(username));
      }
    })
    currentCount.firstElementChild.innerHTML = (pageNum - 1) * selectValue + 1;
    currentCount.lastElementChild.innerHTML = pageNum * selectValue;
    pagination.forEach(el => {
      if (el.classList.contains('active')) {
        el.classList.remove('active')
      }
    })
    e.target.parentElement.classList.add('active')
  }

})



