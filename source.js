const DEFAULT_COLOR = 'rgb(10, 9, 9)';
const DEFAULT_MODE = 'pen';
const DEFAULT_SIZE = 16;

const penBtn = document.getElementById('pen');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const gridSizeBtn = document.getElementById('grid_range');
const grid = document.getElementById('grid');
const rainbowBtn = document.getElementById('rainbow');

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;


function setCurrentMode(newMode){
    currentMode = newMode;
}

function setCurrentSize(newSize){
    currentSize = newSize;
    reloadGrid();
}

function setCurrentColor(newColor){
    currentColor = newColor;
}

clearBtn.onclick = () => reloadGrid(); 
penBtn.onclick = () => setCurrentMode('pen');
eraserBtn.onclick = () => setCurrentMode('eraser');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
gridSizeBtn.onchange = (e) => changeSize();

let mouseDown = false;

//funções de alteração do grid
function setGrid(size){
    //clear();
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for(let i = 0; i < size * size; i++){
        const gridElement = document.createElement('div');

        //gridElement.addEventListener('mouseover', paint);
        //gridElement.addEventListener('mousedown', paint);


        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement)
    }
}

function reloadGrid(){
    clear();
    setGrid(currentSize);
    paint();
    
}

function changeSize(){
    gridSizeBtn.onchange = (e) => setCurrentSize(e.target.value);
    setGrid(currentSize);
    reloadGrid();
}

function clear(){
    grid.innerHTML = ``
}

//funções do paint

setGrid(currentSize)

function random(max, min){
    return Math.round(Math.random() * (max - min) + min);
}

function paint(){
    const gridElement = document.querySelectorAll('.grid-element');
    console.log(gridElement[0])
    
    gridElement.forEach(elemento => {
        elemento.addEventListener('mousedown', () => {
            mouseDown = true;
        })
    })
    
    gridElement.forEach(elemento => {
        elemento.addEventListener('mouseup', () => {
            mouseDown = false;
        })
    })
    
    gridElement.forEach(elemento => {
        elemento.addEventListener('mousemove', () => {
            if(mouseDown == true && currentMode == 'pen'){
                console.log('estou funcionando!')
                elemento.style.backgroundColor = currentColor;
            }else if(mouseDown == true && currentMode == 'eraser'){
                elemento.style.backgroundColor = 'rgb(255,255,255)';
            }else if(mouseDown == true && currentMode == 'rainbow'){
                elemento.style.backgroundColor = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        })
    })    
}
paint()


