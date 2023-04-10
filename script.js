 const itemForm = document.getElementById('item-form')
 const itemInput = document.getElementById('item-input')
 const itemList = document.getElementById('item-list')
 const clearBtn = document.getElementById('clear')
 const itemFilter = document.getElementById('filter')

 function onAddItemSubmit(e) {
    const newItem = itemInput.value
    e.preventDefault()

    if (newItem === ''){
        alert("Please add an item")
        return
    }

    addItemToDOM(newItem)

    // Add item to local storage
    addItemToStorage(newItem)
    checkUI()
    
    itemInput.value = ''
 }

 function addItemToDOM(item) {
    //Create list item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    console.log(li)
    const button = createButton("remove-item btn-link text-red") 
    li.appendChild(button)

    //Add li to the DOM
    itemList.appendChild(li)
 }

 function addItemToStorage(item) {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    // Add new item to the array
    itemsFromStorage.push(item)

    // Convert and add to the new item to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
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

 function filterItems(e) {
    items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase()
        if(itemName.indexOf(text) != -1 ) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }

    })
 }
 //Event Listeners
 itemForm.addEventListener('submit', onAddItemSubmit )
 itemList.addEventListener('click', removeItem)
 clearBtn.addEventListener('click', clearAll)
 itemFilter.addEventListener('input', filterItems)

 checkUI()