 const itemForm = document.getElementById('item-form')
 const itemInput = document.getElementById('item-input')
 const itemList = document.getElementById('item-list')
 const clearBtn = document.getElementById('clear')
 const itemFilter = document.getElementById('filter')

 function addItem(e) {
    const newItem = itemInput.value
    e.preventDefault()

    if (newItem === ''){
        alert("Please add an item")
        return
    }

    //Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    console.log(li)
    const button = createButton("remove-item btn-link text-red") 
    li.appendChild(button)

    itemList.appendChild(li)
    checkUI()
    
    itemInput.value = ''
 }

 function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon)
    return button
 }

 function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
 }

 function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        console.log(e.target.parentElement.parentElement)
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()
            checkUI()
        }
    }
 }

 function clearAll(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    checkUI()
 }

 function checkUI() {
    items = itemList.querySelectorAll('li')

    if (items.length === 0) {
        itemFilter.style.display = 'none'
        clearBtn.style.display = 'none'
    } else {
        itemFilter.style.display = 'block'
        clearBtn.style.display = 'block'   
    }
 }

 //Event Listeners
 itemForm.addEventListener('submit', addItem)
 itemList.addEventListener('click', removeItem)
 clearBtn.addEventListener('click', clearAll)

 checkUI()