//V1.0.1

onload = () => {
    //Button Left
    let BtLeft = document.getElementById("left");
    //Button Right
    let BtRight = document.getElementById("right");
    //Parent of cards
    const caroussel = document.getElementById("caroussel");


    //First Card
    let Fst = document.querySelector("#caroussel>li:first-child");
    //Last Card
    let Lst = document.querySelector("#caroussel>li:last-child");

    //Inicial Values
    let Wait = false;
    let Size = -1;

    //Find Number of Cards
    for (Size = 1; document.querySelector(`#caroussel>li:nth-child(${Size}n)`) != Lst; Size++);
    //Main card (class "M<value>" - 0 middle, -1 left, +1 right,can go from -99 to 99)
    let Main = parseInt(Size / 2) + (Size % 2) + parseInt(caroussel.className.substring(caroussel.className.lastIndexOf("M") + 1, caroussel.className.lastIndexOf("M-") + 3));
    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";

    //Size
    let Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
    console.log(Gap);
    let Offset = Gap + (document.querySelector(`#caroussel>li:nth-child(${Main - 1}n)`).clientWidth);
    console.log(Offset);

    if (Size % 2 == 0) {
        Fst.style.margin = `0 0 0 ${Offset}px`;
    }

    //Animation
    const Cgo = (x) => {
        return ([
            { transform: `translateX(0px)` },
            { transform: `translateX(${x}px)`, easing: "ease-out" }]);
    };

    //Animation Timing config
    const CTiming = {
        //Animations duration - Milisseconds
        duration: 200,
        iterations: 1,
    };

    //Button Left trigger
    BtLeft.addEventListener("click", () => {
        if (Wait) {
            console.log("LeftButton Error : Please Wait");
        }
        else {
            document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = " ";
            Wait = true;
            Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
            Offset = Gap + (document.querySelector(`#caroussel>li:nth-child(${Main - 1}n)`).clientWidth);
            caroussel.animate(Cgo(Offset), CTiming).onfinish = () => {
                let Lhtml = Lst.innerHTML;
                for (let i = Size; i > 1; i--) {
                    document.querySelector(`#caroussel>li:nth-child(${i}n)`).innerHTML = document.querySelector(`#caroussel>li:nth-child(${i - 1}n)`).innerHTML;
                }
                Fst.innerHTML = Lhtml;
                document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";
                Wait = false;
            };
        }
    });

    //Button Right trigger
    BtRight.addEventListener("click", () => {
        if (Wait) {
            console.log("RightButton Error : Please Wait");
        }
        else {
            Wait = true;
            document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = " ";
            let Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
            console.log(Gap);
            let Offset = Gap + (document.querySelector(`#caroussel>li:nth-child(${Main + 1}n)`).clientWidth);
            console.log(Offset);
            caroussel.animate(Cgo(-Offset), CTiming).onfinish = () => {
                let Lhtml = Fst.innerHTML;
                for (let i = 1; i < Size; i++) {
                    document.querySelector(`#caroussel>li:nth-child(${i}n)`).innerHTML = document.querySelector(`#caroussel>li:nth-child(${i + 1}n)`).innerHTML;
                }
                Lst.innerHTML = Lhtml;
                document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";
                Wait = false;
            };
        }
    });
}
