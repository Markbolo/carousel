// 当前图片下标
var imgIndex = 1
// 图片总数量
var imgNumber = 5

var log = function() {
    console.log.apply(console, arguments)
}

var selectImg = function(imgIndex) {
    var imgStr = '#id-img-'
    var _image = document.querySelector(imgStr + String(imgIndex))
    return _image
}

var selectIndicator = function(indiIndex) {
    var indiStr = '#id-indi-'
    var indi = document.querySelector(indiStr + String(indiIndex))
    return indi
}

var next = function() {
    var nextButton = document.querySelector('#id-button-next')
    nextButton.addEventListener('click', function(){
        playNextImg()
    })
}

var last = function() {
    var lastButton = document.querySelector('#id-button-last')
    lastButton.addEventListener('click', function(){
        if(imgIndex > 1) {
            removeClassAll('bolo-active')
            removeClassAll('bolo-grey')
            imgIndex -= 1
            selectImg(imgIndex).classList.add('bolo-active')
            selectIndicator(imgIndex).classList.add('bolo-grey')
        } else {
            removeClassAll('bolo-active')
            removeClassAll('bolo-grey')
            imgIndex = imgNumber
            selectImg(imgIndex).classList.add('bolo-active')
            selectIndicator(imgIndex).classList.add('bolo-grey')
        }
    })
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elementList = document.querySelectorAll(selector)
    for(var i = 0; i < elementList.length; i++) {
        elementList[i].classList.remove(className)
    }
}

var playNextImg = function() {
    removeClassAll('bolo-active')
    removeClassAll('bolo-grey')
    imgIndex = imgIndex % imgNumber 
    imgIndex += 1
    selectImg(imgIndex).classList.add('bolo-active')
    selectIndicator(imgIndex).classList.add('bolo-grey')
}

var indicatorSelect = function() {
    // 给小圆点添加点击事件
    var indicators = document.querySelector('.bolo-slide-indicators')
    indicators.addEventListener('click', function(event){
        target = event.target
        if(target.classList.contains('bolo-slide-indi')) {
            removeClassAll('bolo-active')
            removeClassAll('bolo-grey')
            var targetId = target.id
            var indiIndex = targetId.split('-')[2]
            imgIndex = indiIndex
            selectImg(imgIndex).classList.add('bolo-active')
            target.classList.add('bolo-grey')
        }
    })
}

var imgSetInterval = function(time) {
    setInterval(function(){
        playNextImg()
    }, time)
}

var _main = function() {
    next()
    last()
    indicatorSelect()

    // 自动播放下一张图片， 参数为毫秒
    imgSetInterval(6000)
}

_main()