// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color-option")


if (mainColors !== null) {
    // console.log('local Storage Is Not Empty You Can Set It On Root Now')
    // console.log(localStorage.getItem("color-option"))
    document.documentElement.style.setProperty('--main-colo', mainColors);

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")

        // Add Active Class On Element With Datat Color === Local Storage Item
        if (element.dataset.color === mainColors) {

            element.classList.add("active")
        }
    })
}

// Random Background Option
let backgroundOption = true;
// Variable To Control The Background Interval
let intervalBackground;

// Check If There's Local Storage Random Background Item 
let backgroundLocalItem = localStorage.getItem("background_option")

// Check If Random Local Storage Is Not Empty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {

        backgroundOption = true
    } else {

        backgroundOption = false
    }
}

// Remove Active Class From All Spans
document.querySelectorAll(".random-background span").forEach(element => {

    element.classList.remove("active")
});
if (backgroundLocalItem === 'true') {

    document.querySelector(".random-background .yes").classList.add("active")
} else {

    document.querySelector(".random-background .no").classList.add("active")
}





//Start Setting Box 
document.querySelector(".gear-box i").onclick = function () {

    //Toggle Class Fa-spin For Rotation
    this.classList.toggle("fa-spin")

    //Toggle Class Open On Main Setting Box
    document.querySelector(".setting-box").classList.toggle("open")
}

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

    //Click On Every List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty('--main-colo', e.target.dataset.color);

        localStorage.setItem("color-option", e.target.dataset.color)

        //Remove Active Class From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")


        });

        // Add Active Class On Self
        e.target.classList.add("active")
    });
});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-background span")

//loop on all spans
randomBackEl.forEach(span => {
    // Click On Every Span
    span.addEventListener("click", (e) => {

        // Remove Active Class From All Childrens
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active")
        })

        // Add Active Class On Self
        e.target.classList.add("active");

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true)


        } else {

            backgroundOption = false

            clearInterval(intervalBackground)
            localStorage.setItem("background_option", false)
        }
    })
})


// Select Landing Page Element
let landingPage = document.querySelector(".landing")

// Get Array Of Imgs

let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"]

// Function To Ranomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {
        intervalBackground = setInterval(() => {
            //Get RandomNumber
            let randomNumber = Math.floor(Math.random() * imgsArray.length)

            // Change Background Image Url
            landingPage.style.backgroundImage = 'url("./img/' + imgsArray[randomNumber] + '")'
        }, 1000)
    }

}

randomizeImgs();

// Select Skills Selctor

let ourSkills = document.querySelector(".skills")

window.onscroll = function () {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height 
    let widowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - widowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }
}

// Creat Popup With Image
let ourGallery = document.querySelectorAll(".gallery .images-box img")

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {

        // Creat OverLay Element
        let overLay = document.createElement("div")


        // Add Class To overlay
        overLay.classList = "popup-overlay"

        //Append Overlay To The body
        document.body.appendChild(overLay)

        // Creat The Popup box
        let popupBox = document.createElement("div");


        // Add Class To The Popup Box
        popupBox.classList = 'popup-box'

        if (img.alt !== null) {

            //Creat Heading
            let imgHeading = document.createElement("h3")

            // Creat Text for Heading
            let imgText = document.createTextNode(img.alt)

            // Append The text To the Heading
            imgHeading.appendChild(imgText)

            // Append The Heading To The popub-box
            popupBox.appendChild(imgHeading)
        }

        // Creat The Image
        let popupImage = document.createElement("img")

        // Set Image Source
        popupImage.src = img.src

        // Append Image To Popup Box
        popupBox.appendChild(popupImage)

        // Append The popup To Body Box

        document.body.appendChild(popupBox)

        // Creat The Close Sppan
        let closeButton = document.createElement("span")

        // Creat The Close Button Text
        let closeButtonText = document.createTextNode("X")

        // Append text to close button
        closeButton.appendChild(closeButtonText)

        // Add class To Close Button
        closeButton.className = "close-button"

        // Add close button To The Poup Box
        popupBox.appendChild(closeButton)


    })
})

// Close Popup
document.addEventListener('click', function (e) {
    if (e.target.className == 'close-button') {

        // Remove The Current Popup
        e.target.parentNode.remove()

        // Remove Overlay
        document.querySelector(".popup-overlay").remove()
    }
})