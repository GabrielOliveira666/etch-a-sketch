const DEFAULT_COLOR = 'rgb(10, 9, 9)';
const DEFAULT_MODE = 'pen';
const DEFAULT_SIZE = 16;

let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;


function setCurrentMode(newMode){
    currentMode = newMode;
}

function setCurrentSize(newSize){
    currentSize = newSize;
}

function setCurrentColor(newColor){
    currentColor = newColor;
}

const penBtn = document.getElementById('pen');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const gridSizeBtn = document.getElementById('grid_range');
const grid = document.getElementById('grid');
const rainbowBtn = document.getElementById('rainbow');

clearBtn.onclick = () => reloadGrid(); 
penBtn.onclick = () => setCurrentMode('pen');
eraserBtn.onclick = () => setCurrentMode('eraser');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
gridSizeBtn.onchange = (e) => changeSize();

function setGrid(size){
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for(let i = 0; i < size * size; i++){
        const gridElement = document.createElement('div');

        gridElement.addEventListener('mouseover', paint);
        gridElement.addEventListener('mousedown', paint);


        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement)
    }
}

function reloadGrid(){
    clear();
    setGrid(currentSize);
}

function clear(){
    grid.innerHTML = ``
}

function changeSize(){
    gridSizeBtn.onchange = (e) => setCurrentSize(e.target.value);
    setGrid(currentSize);
    reloadGrid();
}

function paint(e){
    if (e.type === 'mouseover' && !mouseDown) return
    if(currentMode == 'pen'){
        e.target.style.backgroundColor = currentColor;
    }
    else if(currentMode == 'eraser'){
        e.target.style.backgroundColor = 'rgb(255,255,255)';
    }
}

setGrid(currentSize)




