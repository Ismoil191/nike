let headerContentPrice = document.querySelector(".header__content-price b")
let headerContentSale = document.querySelector(".header__content-sale")
let headerContentEffect = document.querySelector(".header__content-effect")
let headerContentImg = document.querySelector(".header__content-img")
let headerContentDiscountSpan = document.querySelector(".header__content-discount_span")
let headerContentImages = document.querySelector(".header__content-images")

let headerContentDots = document.querySelector(".header__content-dots")
let headerContentDot = document.querySelectorAll(".header__content-dot")
let header = document.querySelector(".header")
let headerContentBtn = document.querySelector('.header__content-btn')
let  headerbtn = document.querySelector('.header__btn-content')


headerContentBtn.addEventListener('click', function () {
    header.classList.add("active")   
    
})

headerContentBtn.addEventListener('dblclick', function () {
    header.classList.remove('active')
})



    



for (let i = 0; i < headerContentDot.length; i++) {
    headerContentDot[i].setAttribute("data-key", i)
}

headerContentDots.addEventListener('click', showInfo);

function showInfo(e) {
    const key = e.target.dataset["key"]
    if (key === undefined) {
        return true;
    }

    headerContentPrice.innerText = images[key].price
    headerContentSale.innerText = images[key].sale
    headerContentEffect.src = `img/header/${images[key].effect}.png`
    console.log(images[key]);
    headerContentDiscountSpan.innerText = images[key].discount
    headerContentImg.src = `img/header/${images[key].dot}`
    headerContentDot.forEach(item => {
        item.classList.remove('active');
    });
    e.target.classList.add('active');
}

// burger menu start

let headerNavMenu = document.querySelector(".header__nav-menu")
let headerList = document.querySelector(".header__list")
let body = document.querySelector('body')

headerNavMenu.addEventListener("click", function () {
    this.classList.toggle("active")
    headerList.classList.toggle("active")
    body.classList.toggle('active')
    
})

// burger menu end

// product start 
let imgcard = document.querySelectorAll(".card__img")
let imgcard2 = document.querySelectorAll(".card-img")
for (let i = 0; i < imgcard.length; i++) {
    imgcard[i].addEventListener("click", function () {
        this.classList.add("active")
        imgcard2[i].classList.add("active")
        
    })
    for (let i = 0; i < imgcard2.length; i++) {
        imgcard2[i].addEventListener("click", function () {
            this.classList.remove("active")
            imgcard[i].classList.remove("active")
            
        })
    }
}

// product end 


// slider start

class Slider {
    constructor(config) {
        this.slider = document.querySelector(config.slider)
        this.sliderBox = this.slider.querySelector('.slider__box')
        this.timeMove = config.time
        this.item = [...this.sliderBox.children]
        this.next = this.slider.querySelector('.slider__next')
        this.prev = this.slider.querySelector('.slider__prev')
        console.log(this.item);
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.direction = config.direction != undefined ? config.direction : 'X';
        this.moveSize = this.width
        this.active = true
        this.activeSlide = 0
        if (config.dots) {
            let parent = document.createElement('ul')
            parent.className = 'slider__dots'
            this.item.forEach(key => {
                parent.innerHTML += '<li class="slider__dots-item"></li>';
            })
            this.slider.append(parent)
            this.dots = [...document.querySelector('.slider__dots').children]
            this.dots[this.activeSlide].classList.add('active')
        }
        // this.interval
        this.dots.forEach((key, index) => {
            key.addEventListener('click', () => this.Dots(index))
        })
        this.sliderBox.style = `
                                position: relative;
                                height: ${this.height}px;
                                overflow: hidden;
                                max-width: ${this.width}px;
                                width:100%;
                               `
        for (let i = 0; i < this.item.length; i++) {
            const item = this.item[i];
            item.style = `position: absolute;
                max-width: ${this.width}px;
                width:100%;
                height: ${this.height}px;
               `
            if (i != this.activeSlide) {
                item.style.transform = `translate${this.direction}(${this.moveSize}px)`
            }
            if (i == this.item.length - 1) {
                item.style.transform = `translate${this.direction}(${-this.moveSize}px)`
            }
        }
        this.next.addEventListener('click', () => this.clickBtn(this.next))
        this.prev.addEventListener('click', () => this.clickBtn(this.prev))




    }
    clickBtn(btn) {

        this.prev.disabled = true
        this.next.disabled = true

        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.timeMove);

        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        for (let i = 0; i < this.item.length; i++) {
            const sliders = this.item[i]
            sliders.style.transition = '0ms'
            if (i != this.activeSlide) {
                sliders.style.transform = `translate${this.direction}(${btnLeftOrRight * -1}px)`
            }

        }

        this.item[this.activeSlide].style.transform = `translate${this.direction}(${btnLeftOrRight}px)`
        this.item[this.activeSlide].style.transition = `${this.timeMove}ms`;

        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.item.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.item.length - 1
            }
        }
        


        this.item[this.activeSlide].style.transform = `translate${this.direction}(0px)`
        this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
        let answer = this.item[this.activeSlide].getAttribute('data-num');
        let dots = document.querySelectorAll('.slider__dots-item');
        dots.forEach(item=> item.classList.remove('active'))
        dots[answer].classList.add('active');
    }
    Dots(index) {
        if (this.active && index != this.activeSlide) {
            for (let i = 0; i < this.item.length; i++) {
                const slide = this.item[i];
                slide.style.transition = '0ms';
            }
            
            this.active = false
            this.dots.forEach(key => key.classList.remove('active'))

            let btnLeftOrRight = index > this.activeSlide ? this.moveSize : -this.moveSize;
            this.item[index].style.transform = `translate${this.direction}(${btnLeftOrRight}px)`;
            setTimeout(() => {
                this.item[this.activeSlide].style.transform = `translate${this.direction}(${-btnLeftOrRight}px)`;
                this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
                this.dots[this.activeSlide].classList.remove('active')

                this.activeSlide = index

                this.item[this.activeSlide].style.transform = `translate${this.direction}(0px)`;
                this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
                this.dots[index].classList.add('active')
            }, 100)
            setTimeout(() => {
                this.active = true
            }, this.timeMove + 200)
        }
        
    }
}


const slider = new Slider({
    direction: 'X',
    slider: '#carousel',
    time: 1000,
    dots: true
})

// slider end 



// player start
class Player {
    constructor(selector){
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.playvideo();
    }
    playvideo(){
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play__circle').addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
        this.player.querySelector('.fullscreen').addEventListener('click',  this.toggleFullscreen.bind(this));
        this.player.querySelector('.mute').addEventListener('click', this.toggleVolume.bind(this));
        this.player.querySelector('.volume__slider').addEventListener('input', this.setVolume.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.panel__line').addEventListener('click', this.setVideoLine.bind(this));
    }
    toggleVideo(){
        this.playing = !this.playing;
        const playCircle = this.player.querySelector('.play__circle');
        const playIcon = this.player.querySelector('.play .fas');
        playIcon.classList.toggle('fa-play', !this.playing);
        playIcon.classList.toggle('fa-pause', this.playing);
        if(this.playing){
            this.video.play();
            playCircle.style.display = 'none';
        }
        else {
            this.video.pause();
            playCircle.style.display = 'block';
        }
    }
    toggleFullscreen(){
        const full = document.fullscreenElement;
        const fullIcon = this.player.querySelector('.fullscreen .fas');
        fullIcon.classList.toggle('fa-expand', full);
        fullIcon.classList.toggle('fa-compress', !full);
        
        if(!full){
            this.player.requestFullscreen();
        }
        else{
            document.exitFullscreen();
        }
    }
    toggleVolume(){
        this.sounding = !this.sounding;
        const volumeIcon = this.player.querySelector('.mute .fas');
        const volumeSlider = this.player.querySelector('.volume__slider');
        volumeIcon.classList.toggle('fa-volume-up', !this.sounding);
        volumeIcon.classList.toggle('fa-volume-mute', this.sounding);
        if(this.sounding){
            this.video.muted = true;
            volumeSlider.setAttribute('data-volume', volumeSlider.value);
            volumeSlider.value = 0;
        }
        else{
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute('data-volume');
        }
    }
    setVolume(){
        this.video.volume = this.player.querySelector('.volume__slider').value / 100;
    }
    setVideoTime(){
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.time__duraction').innerHTML = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    }
    timeUpdate(){
        const duration = Math.floor(this.video.duration);
        const current = Math.floor(this.video.currentTime);
        
        let seconds;
        if(current % 60 < 10) {
            seconds = `0${current % 60}`;
        }
        else {
            seconds = `${current % 60}`;
        }
        this.player.querySelector('.time__current').innerHTML = `${Math.floor(current / 60)}:${seconds}`;
        this.player.querySelector('.panel__line_current').style.width = `${current / duration * 100}%`
    }
    setVideoLine(event){
        const lineWidth = this.player.querySelector('.panel__line').clientWidth;
        const posation = event.offsetX;
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.panel__line_current').style.width = `${posation / lineWidth * 100}%`;
        this.video.currentTime = posation / lineWidth * duration;
    }
}
let player = new Player('.player');
console.log(player);

// player end 