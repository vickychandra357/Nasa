const searchForm = document.querySelector("#search-form")
const mainContainer = document.getElementById("main-image-container")
const imgContainer = document.getElementById("current-image-container")
const history = document.getElementById("search-history")
const inputDate = document.getElementById("search-input")
const heading = document.getElementById('heading')

let currentDate = new Date().toISOString().split("T")[0]

const img = document.createElement("img")
const titleHeading = document.createElement("h3")
const description = document.createElement("p")

window.addEventListener("load", () => {
    heading.textContent = `Picture of The Day`
    getCurrentImageOfTheDay()
})

async function getCurrentImageOfTheDay() {
    try {
        // fetching data
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
        )
        const data = await response.json()
        console.log(data)

        // updating image on UI
        const imgUrl = data?.url
        // console.log(imgUrl)
        img.src = imgUrl
        img.classList.add("image")
        mainContainer.appendChild(img)

        // updating title
        const title = data?.title
        titleHeading.textContent = title
        imgContainer.appendChild(titleHeading)

        // updating content on UI
        const para = data?.explanation
        description.textContent = para
        imgContainer.appendChild(description)

        mainContainer.appendChild(imgContainer)
    } catch (error) {
        console.log("Error => " + error)
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()

    // const inputDate = searchForm.elements["search-input"]
    if (inputDate.value) {
        const selectedDate = new Date(inputDate.value)
        currentDate = selectedDate.toISOString().split("T")[0]
        heading.textContent = `Picture of The Day For ${currentDate}`
        getImageOfTheDay()
        saveSearch()
        addSearchToHistory()
    }
})

async function getImageOfTheDay() {
    // fetching data
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
    )
    const data = await response.json()
    console.log(data)

    // updating image on UI
    const imgUrl = data?.url
    // console.log(imgUrl)

    img.src = imgUrl
    img.classList.add("image")
    mainContainer.appendChild(img)

    // updating title
    const title = data?.title

    titleHeading.textContent = title
    imgContainer.appendChild(titleHeading)

    // updating content on UI
    const para = data?.explanation

    description.textContent = para
    imgContainer.appendChild(description)

    mainContainer.appendChild(imgContainer)
}

function saveSearch() {
    let DateArr = []
    DateArr.push(currentDate)
    localStorage.setItem(`Date ${DateArr.length}`, currentDate)
}

function addSearchToHistory() {

    const a = document.createElement("a")
    a.href = ''
    const li = document.createElement("li")
    li.textContent = currentDate;
    a.appendChild(li)
    history.appendChild(a)

    a.addEventListener("click", (event) => {
        event.preventDefault()
        currentDate = li.textContent
        heading.textContent = `Picture of The Day For ${currentDate}`;
        getImageOfTheDay();
    });
}
